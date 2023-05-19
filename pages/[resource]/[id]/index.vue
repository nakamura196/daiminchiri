<script setup lang="ts">
const nuxtApp = useNuxtApp();

const route = useRoute();

const localePath = useLocalePath();

const { t } = useI18n();

const id = String(route.params.id);

let item: any = null;

const runtimeConfig = useRuntimeConfig();
const appUrl = runtimeConfig.public.appUrl;

if (process.server && nuxtApp.payload.data[id]) {
  item = nuxtApp.payload.data[id];
} else {
  const url = `${appUrl}/data/index.json`;
  const { data }: any = await useFetch(url);
  for (const i of data.value) {
    if (i._id === id) {
      item = i;
      break;
    }
  }
}

const resource = String(route.params.resource);

const label = {
  value: item ? item.label : "",
};

const path = {
  name: "resource",
  params: {
    resource,
  },
};

const bh = reactive([
  {
    title: t("top"),
    color: "primary",
    disabled: false,
    to: localePath({
      name: "index",
    }),
  },
  {
    title: t(resource),
    disabled: false,
    color: "primary",
    to: localePath(path),
  },
  {
    title: label.value,
    disabled: false,
  },
]);

const $t = useI18n().t;

useJsonld([
  {
    itemListElement: [
      {
        position: 1,
        name: $t("top"),
        item: appUrl,
        "@type": "ListItem",
      },
      {
        position: 2,
        name: route.params.resource,
        item: `${appUrl}/${route.params.resource}`,
        "@type": "ListItem",
      },
      {
        position: 3,
        name: label.value,
        item: `${appUrl}/${route.params.resource}/${route.params.id}`,
        "@type": "ListItem",
      },
    ],
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
  },
]);

if (label.value) {
  useHead({
    titleTemplate: `${label.value} - %s`,
    meta: [{ property: "og:title", content: `${label.value} - %s` }],
  });
}
</script>
<template>
  <LayoutsCommon v-if="item" :items="bh" :container="false">
    <CustomMoleculesSearchItem :item="item" />
  </LayoutsCommon>
</template>
