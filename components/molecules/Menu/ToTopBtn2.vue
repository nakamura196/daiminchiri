<script setup lang="ts">
import { mdiArrowUp } from "@mdi/js";

interface PropType {
  id?: string;
}

const props = withDefaults(defineProps<PropType>(), {
  id: "",
});

const fab = ref(true /*false*/);

const toTop = () => {
  if (typeof window === "undefined") return;
  const target = props.id ? document.getElementById(props.id) : window;

  // if(!target) return;
  target?.scrollTo({
    top: 0,
    // behavior: "smooth",
  });
};
</script>
<template>
  <!-- v-scroll="onScroll" -->
  <v-btn
    v-show="fab"
    style="position: absolute; right: 16px; bottom: 16px"
    dark
    color="error"
    :icon="mdiArrowUp"
    @click="toTop"
  />
</template>
