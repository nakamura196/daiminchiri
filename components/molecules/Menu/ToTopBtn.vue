<template>
  <v-layout-item
    position="bottom"
    v-scroll="onScroll"
    model-value
    size="0"
    class="text-end mb-16 pr-4"
  >
    <v-fab-transition>
      <v-btn v-show="model" color="error" :icon="mdiArrowUp" @click="onClick" />
    </v-fab-transition>
  </v-layout-item>
</template>

<script setup>
import { mdiArrowUp } from "@mdi/js";
import { ref } from "vue";
const model = ref(false);
function onScroll() {
  model.value = window.scrollY > 20;
}
function onClick() {
  window.scrollTo({
    top: 0,
  });
}
</script>