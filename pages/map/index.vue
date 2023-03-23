<script setup lang="ts">
import { $search } from "~/utils/search";

const routeQuery = useRoute().query;

const localePath = useLocalePath();

const zoom = ref(5);
const center = ref([42.43242, 129.74148]);
const coordinates = ref<any[]>([]);

onMounted(async () => {
  const q: any = routeQuery.value || {};
  q.size = -1;
  const results = await $search(q, "fuse");

  const coordinates_ = [];

  for (const item of results.hits.hits) {
    if (item.latitude) {
      const coordinate = [item.latitude, item.longitude];
      coordinates_.push({
        id: item._id,
        label: item.label,
        c: coordinate,
        to: localePath({
          name: "resource-id",
          params: {
            resource: "item",
            id: item._id,
          },
        }),
      });

      if (coordinates_.length > 10000 /* > 200*/) {
        break;
      }
    }
  }

  coordinates.value = coordinates_;
});

const { t } = useI18n();

const item = {
  title: "map",
};

const tileProviders = [
  {
    name: "国土地理院ウェブサイト",
    attribution: "国土地理院ウェブサイト",
    url: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
  },
];

const bh = [
  {
    title: t("top"),
    disabled: false,
    to: localePath({ name: "index" }),
  },
  {
    title: t(item.title),
    disabled: false,
  },
];
</script>
<template>
  <LayoutsCommon :title="item.title" :items="bh">
    <div style="height: 600px; width: 100%">
      <ClientOnly>
        <MoleculesMapCluster
          :zoom="zoom"
          :center="center"
          :coordinates="coordinates"
        ></MoleculesMapCluster>
      </ClientOnly>
    </div>
  </LayoutsCommon>
</template>
