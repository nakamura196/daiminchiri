import { searchByFuse } from "./searchByFuse";

const $search = async (query, type: string = "fuse") => {
  if (type === "fuse") {
    return await searchByFuse(query);
  } else {
    return {};
  }
};

const truncate = (text: string, num: number = 20) => {
  if (text.length > num) {
    return text.slice(0, num) + "...";
  } else {
    return text;
  }
};

const getTypedValues = (query: any, field: string, type: string) => {
  // const field = props.id;
  // const query = route.query; // this.$route.query

  const values = [];
  for (const queryField in query) {
    if (
      queryField.includes(/*'[refinementList][' + field + ']'*/ "f-" + field)
    ) {
      let currentValues: any = query[queryField];
      if (typeof currentValues === "string") {
        currentValues = [currentValues];
      }
      for (const value of currentValues) {
        if (type === "minus" && value.substring(0, 1) === "-") {
          //values.push(value.substring(1))
          values.push(value);
        } else if (type === "plus" && value.substring(0, 1) !== "-") {
          values.push(value);
        }
      }
      //values.push(query[queryField] || '')
    }
  }

  return values;
};

const getKeywordQueries = (route: any) => {
  const queries: any = {};
  // const

  const query = route.query;

  const keywords = [];

  for (const key in query) {
    if (key.startsWith("q-") || key.startsWith("f-")) {
      const field = key.replace("q-", "").replace("f-", "");
      if (!queries[field]) queries[field] = [];
      let values = query[key];
      if (!Array.isArray(values)) {
        values = [values];
      }
      for (const value of values) {
        if (queries[field].indexOf(value) === -1) queries[field].push(value);
        // queries[field].push(value);
      }
    } else if (key === "keyword") {
      let values = query[key];
      if (!Array.isArray(values)) {
        values = [values];
      }
      for (const value of values) {
        if (value) {
          keywords.push(value);
        }
      }
    }
  }

  // queries.label = keywords;

  // return keywords;
  return { queries, keywords };
};

// 入力された配列のすべての組み合わせを生成する関数
function allCombinations(arrays: any[]): any[] {
  const numberOfCombinations = arrays.reduce(
    (res, array) => res * array.length,
    1
  );

  const result: any = Array(numberOfCombinations)
    .fill(0)
    .map(() => []);

  let repeatEachElement;

  for (let i = 0; i < arrays.length; i++) {
    const array = arrays[i];
    repeatEachElement = repeatEachElement
      ? repeatEachElement / array.length
      : numberOfCombinations / array.length;

    const everyElementRepeatedLength = repeatEachElement * array.length;

    for (let j = 0; j < numberOfCombinations; j++) {
      const index = Math.floor(
        (j % everyElementRepeatedLength) / repeatEachElement
      );
      result[j][i] = array[index];
    }
  }

  return result;
}

// 与えられた文字列の異体字を変換する関数
const convertItaijiText = (text: string, itaiji: any): string[] => {
  if (!text) return [];

  const words = text.split("");

  const words2 = words.map((word) => {
    if (itaiji[word]) {
      return itaiji[word];
    } else {
      return [word];
    }
  });

  const keywordsWithSynonym: string[] = [];
  const result = allCombinations(words2);
  for (const v of result) {
    keywordsWithSynonym.push(v.join(''));
  }

  return keywordsWithSynonym;
}

// 今後、要検討
const highlight = (route:any, text: string, key: string, matches = null, itaiji = {}) => {
  if (!text) return text;

  const { queries, keywords } = getKeywordQueries(route);

  text = String(text).trim();

  let queryValues = [];

  // const { queries, keywords } = getKeywordQueries();

  if (queries[key]) {
    queryValues = queries[key];
  }

  let candidates = [...keywords, ...queryValues];
  //重複の削除
  candidates = candidates.filter(
    (element, index) => candidates.indexOf(element) === index
  );
  //文字列の長さで並び替え
  candidates.sort(function (a, b) {
    return b.length - a.length;
  });

  for (let value of candidates) {
    const values = convertItaijiText(value, itaiji)

    const regexp = new RegExp(values.join("|"), "gi");
    text = text.replace(regexp, function (match) {
      return '<span class="highlight">' + match + "</span>";
    });
  }

  return text;
};



export { $search, truncate, getTypedValues, highlight };
