import {
    LIcon,
    LMap,
    LMarker,
    LPopup,
    LTileLayer,
  } from "@vue-leaflet/vue-leaflet";
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  
  export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("LMap", LMap);
    nuxtApp.vueApp.component("LTileLayer", LTileLayer);
    nuxtApp.vueApp.component("LMarker", LMarker);
    nuxtApp.vueApp.component("LIcon", LIcon);
    nuxtApp.vueApp.component("LPopup", LPopup);
  
    return {
      provide: {
        L,
      },
    };
  });