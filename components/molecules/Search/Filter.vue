<script setup lang="ts">
import {truncate} from "~/utils/search"

const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();

const items = computed(() => {
  const filters: any[] = [];
  const query = route.query;
  for (const key in query) {
    if (key.includes("q-") || key.includes("f-")) {
      let values = query[key];
      if (typeof values === "string") {
        values = [values];
      }
      for (const value of values) {
        filters.push({
          label: key,
          value,
        });
      }
    }
  }
  return filters;
});

const fixField = (text: string) => {
  // return text.replace("q-", "詳細検索-").replace("f-", "ファセット-");
  return text.replace("q-", "").replace("f-", "");
};

const fixValue = (text: string) => {
  if (text.startsWith("-")) {
    return text.slice(1);
  }
  return text;
};

const init = () => {
  const query = JSON.parse(JSON.stringify(route.query));
  for (const key in query) {
    if (key.includes(/*'[refinementList]'*/ "q-") || key.includes("f-")) {
      delete query[key];
    }
  }

  // ページは先頭へ
  delete query.page;

  router.push(localePath({
    name: "resource",
    params: {
      resource: "item",
    },
    query,
  }))
};

const isMinus = (value: string) => {
  return value.startsWith("-");
};

const faceted = (field: string, selectedValues: any) => {
  const query = JSON.parse(JSON.stringify(route.query));

  if (typeof selectedValues === "string") {
    selectedValues = [selectedValues];
  }

  let values = [];
  for (const queryField in query) {
    if (queryField === field) {
      let vs = query[queryField];
      if (typeof vs === "string") {
        vs = [vs];
      }
      for (const v of vs) {
        values.push(v);
      }
    }
  }

  if (selectedValues.length !== 0) {
    for (const value of selectedValues) {
      if (values.includes(value)) {
        values = values.filter((n) => n !== value);
      } else {
        values.push(value);
      }
    }
  }

  //新しいリストで置き換え
  query[field] = values;

  query.page /*['main[page]']*/ = 1;

  /*
    const to: any = {
      name: 'search',
    }
    to.query = query
    this.$router.push(this.localePath(to))
    */

  router.push(localePath({
    name: "resource",
    params: {
      resource: "item",
    },
    query,
  }))
};

</script>
<template>
  <div v-if="items.length > 0 ? 'mb-4' : ''">
    <!-- {{items}} -->
    <v-chip
      v-for="(filter, key) in items"
      :key="key"
      class="mr-2 my-1"
      closable
      size="small"
      :class="isMinus(filter.value) ? 'bg-red-darken-1' : 'bg-sub'"
      @click:close="faceted(filter.label, filter.value)"
    >
      <span class="mr-1">{{ $t(fixField(filter.label)) }}:</span>
      {{ truncate($t(fixValue(filter.value))) }}
    </v-chip>

    <v-btn
      flat
      variant="text"
      size="small"
      class="my-1"
      color="primary"
      @click="init()"
    >
      {{ $t("clear") }}
    </v-btn>
  </div></template>
