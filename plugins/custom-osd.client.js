import { OsdCustomViewer } from "@nakamura196/osd-custom-viewer";
import "@nakamura196/osd-custom-viewer/dist/style.css"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("OsdCustomViewer", OsdCustomViewer);
});