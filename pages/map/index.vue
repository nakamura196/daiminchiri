<script setup lang="ts">
import { $search } from "~/utils/search";
// import { MarkerClusterGroup } from 'leaflet.markercluster';

const localePath = useLocalePath();

const routeQuery = useRoute().query;

const zoom = ref(5);
const center = ref([42.43242, 129.74148]);
const coordinates = ref<any[]>([]);

const lmap = ref<any>(null);

const markersGroup = ref(null);

const handleMapSetup = async () => {
  // console.log(lmap.value.center);

  // markersGroup.value = new MarkerClusterGroup()

  await nextTick();

  /*
  markersGroup.value.addLayers(
    coordinates.value.map((s) => {
      return L.marker(s)
    })
  );
  */
};

onMounted(async () => {
  const q: any = routeQuery.value || {};
  q.size = -1;
  const results = await $search(q, "fuse");

  const coordinates_ = [];

  for (const item of results.hits.hits) {
    if (item.latitute) {
      const coordinate = [item.latitute, item.longitude];
      coordinates_.push({
        id: item._id,
        label: item.label,
        c: coordinate,
      });

      if (coordinates_.length > 200) {
        break;
      }
    }
  }

  coordinates.value = coordinates_;
});
</script>
<template>
  <div style="height: 100%; width: 100%">
    <l-map
      @ready="handleMapSetup"
      :use-global-leaflet="false"
      ref="lmap"
      v-model:zoom="zoom"
      :center="center"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <l-marker
        v-for="coordinate in coordinates"
        :lat-lng="coordinate.c"
        draggable
      >
        <l-popup>
          <nuxt-link
            :to="
              localePath({
                name: 'resource-id',
                params: {
                  resource: 'item',
                  id: coordinate.id,
                },
              })
            "
            >{{ coordinate.label }}</nuxt-link
          >
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
