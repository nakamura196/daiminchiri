<script setup lang="ts">
const localePath = useLocalePath();
const bh = [
  {
    title: "トップ",
    disabled: false,
    to: localePath({ name: "index" }),
  },
  {
    title: "お知らせ",
    disabled: false
  }
];
</script>
<template>
  <LayoutsCommon :title="'お知らせ'" :items="bh">
    <MoleculesNewsList></MoleculesNewsList>
  </LayoutsCommon>
</template>
