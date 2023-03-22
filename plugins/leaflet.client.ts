import L from 'leaflet'
import 'leaflet.markercluster';
export default defineNuxtPlugin(nuxtApp => {
  return {
      provide: {
        L
      }
    }
})