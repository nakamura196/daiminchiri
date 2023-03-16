
<script setup lang="ts">
import * as L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import {
  LMap,
  LTileLayer,
  LControlZoom,
  LControlLayers,
} from "@vue-leaflet/vue-leaflet";

interface PropType {
  zoom: number;
  center: any;
  tileProviders?: {
    name: string;
    attribution: string;
    url: string;
  }[];
  coordinates: any[]
}

const props = withDefaults(defineProps<PropType>(), {
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
const center_ = ref(props.center);

onMounted(() => {
  L.Map.addInitHook(function () {
    const markerCluster = L.markerClusterGroup({
      removeOutsideVisibleBounds: true,
      chunkedLoading: true,
    }).addTo(this);

    let markers = [];

    for(const e of props.coordinates) {
      const marker = L.marker(e.c);
      marker.bindPopup(e.label);
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
    :useGlobalLeaflet="true"
  >
    <l-control-layers v-if="tileProviders.length > 1"/>
    <l-control-zoom />
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