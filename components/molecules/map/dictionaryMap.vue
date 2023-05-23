<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import {
  LMap,
  LTileLayer,
  LControlLayers,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";

interface PropType {
  box: string;
  zoom?: number;
  center?: any;
  tileProviders?: {
    name: string;
    attribution: string;
    url: string;
  }[];
  coordinates?: any[];
}

const props = withDefaults(defineProps<PropType>(), {
  box: "",
  zoom: 3,
  center: () => [54, 28],
  tileProviders: () => [
    {
      name: "OpenStreetMap",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
  ],
  coordinates: () => [],
});

const zoom_ = ref(props.zoom);
// const center_ = ref(props.center);

/*
const emit = defineEmits<{
  (action: string): void
}>()
*/

const box = props.box.split(" ");
console.log({ box });

const x_center = (parseFloat(box[0]) + parseFloat(box[2])) / 2;
const y_center = (parseFloat(box[1]) + parseFloat(box[3])) / 2;

const center_ = [x_center, y_center]; //ref([x_center, y_center])

const rectangles = [
  {
    bounds: [
      [parseFloat(box[0]), parseFloat(box[1])],
      [parseFloat(box[2]), parseFloat(box[3])],
    ],
    /*
        style: {
            color: "#ff7800",
            weight: 1,
        },
        */
  },
];

const runtimeConfig = useRuntimeConfig();
const publicRuntimeConfig = runtimeConfig.public;
const appUrl = publicRuntimeConfig.appUrl;

onMounted(() => {
  L.Map.addInitHook(function () {
    const markerCluster = L.markerClusterGroup({
      removeOutsideVisibleBounds: true,
      chunkedLoading: true,
    }).addTo(this);

    let markers = [];

    for (const e of props.coordinates) {
      const marker = L.marker(e.c);

      marker.bindPopup(
        `<a target="_blank" href="${appUrl}${e.to}">${e.label}</a>`
      );
      markers.push(marker);
    }

    markerCluster.addLayers(markers);
  });
});
</script>

<template>
  <l-map
    :max-zoom="19"
    v-model:zoom="zoom_"
    v-model:center="center_"
    :zoomAnimation="true"
    :markerZoomAnimation="true"
  >
    <l-control-layers v-if="tileProviders.length > 1" />

    <l-rectangle
      v-for="(rectangle, key) in rectangles"
      :bounds="rectangle.bounds"
      
      :key="key"
    ></l-rectangle>
    <!-- :l-style="rectangle.style" -->

    <l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      layer-type="base"
    />
  </l-map>
</template>
