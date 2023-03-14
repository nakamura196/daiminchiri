import { OsdCustomViewer } from "@nakamura196/osd-custom-viewer";
import "@nakamura196/osd-custom-viewer/dist/style.css"
import OpenSeadragon from 'openseadragon'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("OsdCustomViewer", OsdCustomViewer);
  // nuxtApp.vueApp.component("OpenSeadragon", OpenSeadragon);
  return {
    provide: {
      OpenSeadragon,
    },
  };
});