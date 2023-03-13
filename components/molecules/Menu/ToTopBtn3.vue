<template>
  <v-layout-item
    v-scroll="onScroll"
    class="text-end"
    model-value
    position="bottom"
    size="88"
  >
    <div class="ma-4">
      <v-fab-transition>
        <v-btn
          v-show="model"
          color="error"
          :icon="mdiArrowUp"
          @click="onClick"
        />
      </v-fab-transition>
    </div>
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
