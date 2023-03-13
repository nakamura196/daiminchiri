import Fuse from "fuse.js";

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

const fixValue = (value: string, prefix = "") => {
  // フレーズ検索（完全一致）
  if (value.startsWith("-")) {
    //value = "\'!" + value.slice(1) + "\'";
    value = "!" + value.slice(1);
  } else if (value.includes('"')) {
    value = "=" + value.split('"').join("");
  } else {
    value = prefix + value;
  }
  return value;
};

let documents: any = null;
let fuse: any = null;

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
  };

  if (!fuse) {
    if (!documents) {
      documents = JSON.parse(JSON.stringify(await getDocuments()));
    }

    fuse = new Fuse(documents, options);
  }

  let total = 0;
  let hits = [];

  const andQueries = [];

  const currentQuery = query;

  let keyword_ = currentQuery.keyword;
  if (keyword_) {
    const keywordQuery = [];

    if (typeof keyword_ !== "string") {
      keyword_ = keyword_.join("");
    }

    if (keyword_) {
      for (let key of options.keys) {
        //重みを付けている場合
        // {name, weight} という形式になっている
        if (typeof key !== "string") {
          key = key.name;
        }
        keywordQuery.push({
          [key]: fixValue(keyword_),
        });
      }
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
      const field = key.replace("q-", "");
      if (value) {
        // andQueries.push({ [field]: fixValue(value) });
        qQueries.push({ [field]: fixValue(value) });
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
      const field = key.replace("f-", "");

      const orQueries = [];
      let hasMinus = false;
      // queryValue
      for (const value of values) {
        if (value) {
          if (value.startsWith("-")) {
            hasMinus = true;
          }
          // 今後要修正
          const aaa = fixValue(value, "=");
          if (aaa.startsWith("!") && aaa.includes(" ")) {
            const bbb = `!\"${aaa.substring(1)}\"`;
            orQueries.push({ [field]: bbb });
          } else if (aaa.includes(" ")) {
            const bbb = `\"${aaa.substring(1)}\"`;
            orQueries.push({ [field]: bbb });
          } else {
            orQueries.push({ [field]: aaa });
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
      result_ = documents;
    } else {
      result_ = []; // documents;
    }
  } else {
    const fuseResult = fuse.search(searchQuery);
    result_ = fuseResult.map((item: any) => {
      const item_ = item.item;
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

      documents.push(doc);
    }
  } else {
    const url = appUrl + `/data/index.json`;

    const res = await fetch(url);

    const data = await res.json();

    documents = data;
  }

  /*

  if (!data.value) {
    const { data } = await useFetch(url);
    documents = data.value;
  } else {
    documents = data.value;
  }

  */

  console.log({ documents });

  return documents;
};

export { searchByFuse };
