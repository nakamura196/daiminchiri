<script setup lang="ts">
const localePath = useLocalePath();
const {t} = useI18n();
const bh = [
  {
    title: t("top"),
    disabled: false,
    to: localePath({ name: "index" }),
  },
  {
    title: t("News"),
    disabled: false
  }
];
</script>
<template>
  <LayoutsCommon :title="'お知らせ'" :items="bh">
    <MoleculesNewsList></MoleculesNewsList>
  </LayoutsCommon>
</template>
