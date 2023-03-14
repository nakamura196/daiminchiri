<script setup lang="ts">
const route = useRoute();
const query = route.query;
const manifest = String(query.manifest);

const localePath = useLocalePath();
</script>
<template>
  <nuxt-link
    :to="
      localePath({
        name: 'test',
        query: {
          manifest:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/c1ea8e6b-9403-4394-8619-96aad0ec6329/manifest',
        },
      })
    "
    >manifest</nuxt-link
  >
  <nuxt-link
    :to="
      localePath({
        name: 'test',
        query: {
          manifest:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/4c7f22cf-9fe1-5405-1f3a-c53b39e3a45e/manifest',
        },
      })
    "
    >manifest2</nuxt-link
  >
  <OsdCustomViewer :manifest="manifest"></OsdCustomViewer>
</template>
