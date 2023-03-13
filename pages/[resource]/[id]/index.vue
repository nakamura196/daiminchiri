<script setup lang="ts">
import { useI18n } from "vue-i18n";

const route = useRoute();

const localePath = useLocalePath();

const { t } = useI18n();

const id = route.params.id;

const label = ref(""); // item.label || "ラベルなし";

const item = ref(null);

const runtimeConfig = useRuntimeConfig();
const appUrl = runtimeConfig.public.appUrl;

const isServer = runtimeConfig.public.mode === "server"

const index_compressed = runtimeConfig.public.index_compressed;

if (isServer) {
  const url = `/api/items/${id}`;
  const { data }: any = await useFetch(url);
  item.value = data.value;
  label.value = data.value.label || "ラベルなし";
} else if (!index_compressed) {
  onMounted(async () => {
    const url = appUrl + "/data/index.json";

    const response = await fetch(url);
    const data = await response.json();

    let item_ = null;

    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
        item_ = data[i];
        break;
      }
    }

    label.value = item_.label || "ラベルなし";

    item.value = item_;
  });
} else {
  onMounted(async () => {
    const url = appUrl + "/data/index2.json";

    const response = await fetch(url);
    const data = await response.json();

    let item_ = null;

    const items = data.items;

    for (const e of items) {
      if (e._id === id) {
        item_ = e;
        break;
      }
    }

    const keys = data.keys;
    const values = data.freqs;

    const item2: any = {
      _id: item_._id,
    };

    for (const key_index in item_) {
      const key = keys[key_index];

      const values_ = item_[key_index];
      if (!Array.isArray(values_)) {
        // values_ = [values_]
        item2[key] = values[values_];
      } else {
        const value = values_.map((value_index: number) => {
          return values[value_index];
        });

        item2[key] = value;
      }
    }

    // console.log(item2)

    item_ = item2;

    label.value = item_.label || "ラベルなし";

    item.value = item_;
  });
}

const resource = String(route.params.resource);

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
