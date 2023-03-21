import Fuse from "fuse.js";
import itaiji from "@/assets/json/itaiji.json";

const createAggs = (result: any, aggregations: any) => {
  const aggs: any = {};
  const fields = aggregations; // $config.default.aggregations;
  for (const item of result) {
    for (const field_i of fields) {
      const field = field_i.key;
      if (!aggs[field]) {
        aggs[field] = {};
      }

      let values = item[field];
      if (!Array.isArray(values)) {
        if (!values) {
          values = [];
        } else {
          values = [values];
        }
      }

      for (const value of values) {
        if (!aggs[field][value]) {
          aggs[field][value] = 0;
        }
        aggs[field][value] += 1;
      }
    }
  }

  const es: any = {};

  for (const field_i of fields) {
    const field = field_i.key;
    const buckets = [];
    let freqMap = aggs[field];

    if (!freqMap) continue;

    // ソート

    let sorted = [];

    if (field_i.sort) {
      const keys = Object.keys(freqMap);

      keys.sort();

      for (const key of keys) {
        buckets.push({
          key,
          doc_count: freqMap[key],
        });
      }
    } else {
      let entries = Object.entries(freqMap);

      sorted = entries.sort((a: any, b: any) => b[1] - a[1]);

      for (const obj of sorted) {
        buckets.push({
          key: obj[0],
          doc_count: obj[1],
        });
      }
    }

    es[field] = {
      buckets,
    };
  }
  return es;
};

let documents: any = null;
let fuse: any = null;

const getKeywords = (keyword_: any) => {
  if (!keyword_) return [];
  if (typeof keyword_ !== "string") {
    keyword_ = keyword_.join(" ");
  }

  const keywords: string[] = keyword_.split("　").join(" ").split(" ");

  return keywords.filter((n) => n !== "");
};

const convertItaiji = (keyword: any) => {
  let keyword_ = keyword;
  for (const key_ in itaiji) {
    if (keyword.includes(key_)) {
      keyword_ = keyword_.split(key_).join(itaiji[key_]);
    }
  }
  return keyword_;
};

const convertItaijiArray = (keywords: any) => {
  let keywords_ = [];
  for (let keyword of keywords) {
    keywords_.push(convertItaiji(keyword));
  }
  return keywords_;
};

const searchByFuse: any = async (query: any) => {
  const runtimeConfig = useRuntimeConfig();

  const options = {
    includeScore: true,
    keys: runtimeConfig.default.searchKeys,
    //includeMatches: true,
    threshold: 0,
    useExtendedSearch: true,
    ignoreLocation: true,
    // distance: 1000
    // distance: 0
    /*
    preprocess: (text: any) => {
      let text_ = text;

      for (const key in itaiji) {
        text_ = text_.split(key).join(itaiji[key]);
      }

      return text_;
    }
    */
  };

  if (!fuse) {
    if (!documents) {
      const a = await getDocuments();
      documents = JSON.parse(JSON.stringify(a));
    }

    fuse = new Fuse(documents, options);
  }

  let total = 0;
  let hits = [];

  const andQueries = [];

  const currentQuery = query;

  let keyword_ = currentQuery.keyword;
  let keywords = getKeywords(keyword_);
  keywords = convertItaijiArray(keywords);

  if (keywords.length > 0) {
    const keywordQuery = [];

    for (let key of options.keys) {
      //重みを付けている場合
      // {name, weight} という形式になっている
      if (typeof key !== "string") {
        key = key.name;
      }

      const andQ = [];

      for (const keyword of keywords) {
        andQ.push({
          [key]: `'"${keyword}"`,
        });
      }

      keywordQuery.push({
        $and: andQ,
      });
    }

    if (keywordQuery.length > 0) {
      andQueries.push({
        $or: keywordQuery,
      });
    }
  }

  // 詳細検索
  for (const key in currentQuery) {
    if (!key.includes("q-") && !key.includes("f-")) {
      continue;
    }

    //詳細検索
    if (key.includes("q-")) {
      const qQueries = [];

      let value = currentQuery[key];
      if (typeof value === "object") {
        value = value[0];
      }

      value = convertItaiji(value);

      const field = key.replace("q-", "");
      if (value) {
        if (value.startsWith("-")) {
          qQueries.push({ [field]: `!"${value}"` }); // Items that do not include
        } else if (value.includes('"')) {
          const value_ = value.split('"').join("");
          qQueries.push({ [field]: `="${value_}"` }); // Items that include
        } else {
          qQueries.push({ [field]: `'"${value}"` }); // Items that include
        }
      }

      if (qQueries.length > 0) {
        andQueries.push({
          $and: qQueries,
        });
      }
    }

    //ファセット検索
    if (key.includes("f-")) {
      let values = currentQuery[key];
      if (!Array.isArray(values)) {
        values = [values];
      }

      values = convertItaijiArray(values);

      const field = key.replace("f-", "");

      const orQueries = [];
      let hasMinus = false;
      // queryValue
      for (const value of values) {
        if (value) {
          if (value.startsWith("-")) {
            hasMinus = true;
          }

          if (value.startsWith("-")) {
            const value_ = value.substring(1);

            const notAndQueries = [];
            notAndQueries.push({ [field]: `!^"${value_}"` }); // Items that do not start with
            notAndQueries.push({ [field]: `!"${value_}"$` }); // Items that do not end with
            orQueries.push({ $or: notAndQueries }); // !
          } else {
            orQueries.push({ [field]: `="${value}"` });
          }
        }
      }
      if (orQueries.length > 0) {
        const operator = hasMinus ? "$and" : "$or";
        andQueries.push({ [operator]: orQueries });
      }
    }
  }

  const searchQuery = {
    $and: andQueries,
  };

  // 検索
  let result_ = null;
  if (searchQuery.$and.length === 0) {
    const search_all = runtimeConfig.public.search.fuse.search_all;
    if (search_all) {
      const documents_ = [];
      for (const document of documents) {
        documents_.push(document.raw);
      }
      result_ = documents_;
    } else {
      result_ = []; // documents;
    }
  } else {
    const fuseResult = fuse.search(searchQuery);
    result_ = fuseResult.map((item: any) => {
      const item_ = item.item.raw;
      item_._score = item.score;
      return item_;
    });
  }

  const aggs = createAggs(result_, runtimeConfig.public.default.aggregations);

  // 後処理

  total = result_.length;
  hits = result_;

  const sort = query.sort || runtimeConfig.public.default.defaultSort;
  const sortSpl = sort.split(":");
  const sortValue = sortSpl[1];
  const sortKey = sortSpl[0];
  const reverse = sortValue === "asc" ? -1 : 1;

  if (sortKey === "_score") {
    hits.sort(function (a: any, b: any) {
      const sortKey2 = "_score";
      const weightKey = "_weight";
      let v_a = a[sortKey2] / a[weightKey];
      let v_b = b[sortKey2] / b[weightKey];
      if (v_a > v_b) return reverse;
      if (v_a < v_b) return -1 * reverse;
      return 0;
    });
  } else {
    hits.sort(function (a: any, b: any) {
      let v_a = typeof a[sortKey] === "object" ? a[sortKey][0] : a[sortKey];
      let v_b = typeof b[sortKey] === "object" ? b[sortKey][0] : b[sortKey];
      if (v_a < v_b) return reverse;
      if (v_a > v_b) return -1 * reverse;
      return 0;
    });
  }

  const size =
    Number(query.size) || runtimeConfig.public.default.defaultPerPage;
  const page = Number(query.page) || 1;

  const filtered = hits.slice((page - 1) * size, page * size);

  const results = {
    hits: {
      total: {
        value: total,
      },
      hits: filtered,
    },
    aggregations: aggs,
  };

  return results;
};

const getDocuments2 = async () => {
  const runtimeConfig = useRuntimeConfig();

  const appUrl = runtimeConfig.public.appUrl;

  // const appUrl = "http://localhost:3000/outougata"

  // const url = appUrl + `/api/items/index.json`;

  const url = appUrl + `/data/index.json`;

  const { data } = await useFetch(url);

  let documents: any = [];

  if (!data.value) {
    const { data } = await useFetch(url);
    documents = data.value;
  } else {
    documents = data.value;
  }

  return documents;
};

const getDocuments = async () => {
  const runtimeConfig = useRuntimeConfig();

  const index_compressed = runtimeConfig.public.index_compressed;

  const appUrl = runtimeConfig.public.appUrl;

  if (index_compressed) {
    // const appUrl = "http://localhost:3000/outougata"

    // const url = appUrl + `/api/items/index.json`;

    const url = appUrl + `/data/index2.json`;

    const res = await fetch(url);

    const data = await res.json();

    const keys = data.keys;
    const values = data.freqs;
    const items = data.items;

    // const { data } = await useFetch(url);

    let documents: any = [];
    // const raw: any[] = []

    const documents_ = [];

    for (const item of items) {
      const doc: any = {
        _id: item._id,
      };

      for (const key_index in item) {
        const key = keys[key_index];

        // doc[key] = value

        let values_ = item[key_index];
        if (!Array.isArray(values_)) {
          // values_ = [values_]
          doc[key] = values[values_];
        } else {
          const value = values_.map((value_index: number) => {
            return values[value_index];
          });

          doc[key] = value;
        }
      }

      /*
      

      for(const item of documents) {
        const item_: any = {}
        for (const key in item) {

          let values = item[key]
          if(typeof values === "string") {
            values = [values]
          }
          
          const values_ = []
          for(const value of values) {
            for (const key_ in itaiji) {
              if(value.includes(key_)) {
                values_.push(value.split(key_).join(itaiji[key_]))
              } else {
                values_.push(value)
              }
            }
          }

          item_[key] = values_
          
        }
        documents_.push(item_)
      }

      */

      const item_: any = {};

      for (const key in doc) {
        let values = doc[key];
        if (typeof values !== "object") {
          values = [values];
        }

        const values_ = [];
        for (let value of values) {
          value = String(value);
          for (const key_ in itaiji) {
            if (value.includes(key_)) {
              value = value.split(key_).join(itaiji[key_]);
            }
          }
          values_.push(value);
        }

        item_[key] = values_;
      }

      documents_.push(item_);
      documents.push(doc);
    }

    return {
      raw: documents,
      documents: documents_,
    };
  } else {
    const url = appUrl + `/data/index.json`;

    const res = await fetch(url);

    const data = await res.json();

    // const raw = JSON.parse(JSON.stringify(data));

    const documents_ = [];

    for (const item of data) {
      const item_cloned = JSON.parse(JSON.stringify(item));

      const item_: any = {};
      for (const key in item_cloned) {
        let values = item_cloned[key];

        if (typeof values !== "object") {
          values = [values];
        }

        const values_ = [];
        for (let value of values) {
          let valueString = String(value);
          for (const key_ in itaiji) {
            if (valueString.includes(key_)) {
              valueString = valueString.split(key_).join(itaiji[key_]);
            }
          }
          values_.push(valueString);
        }

        item_[key] = values_;
      }

      item_.raw = item;

      documents_.push(item_);
    }

    return documents_;
  }
};

export { searchByFuse };
