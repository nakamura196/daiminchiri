<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const app_name = runtimeConfig.public.appUrl;

const { theme } = useSettings();

onMounted(() => {
  let theme_ = localStorage.getItem(`${app_name}-theme`);
  theme.value = theme_ || "light";
});
</script>
<template>
  <v-app :theme="theme" v-show="theme">
    <slot></slot>
  </v-app>
</template>
