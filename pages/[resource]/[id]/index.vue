<script setup lang="ts">
const nuxtApp = useNuxtApp();

const route = useRoute();

const id = String(route.params.id);

let item: any = null

if (process.server && nuxtApp.payload.data[id]) {
  item = nuxtApp.payload.data[id];
} else {
}
</script>
<template>
  <div>a</div>
</template>
