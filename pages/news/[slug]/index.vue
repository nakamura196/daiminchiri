<script setup lang="ts">
const slug = useRoute().params.slug;
const {locale} = useI18n()

const {t} = useI18n();

const item = await queryContent(`/${locale.value}/news/` + slug).findOne();

const localePath = useLocalePath();

const bh = [
  {
    title: t("top"),
    disabled: false,
    to: localePath({ name: "index" }),
  },
  {
    title: t("News"),
    disabled: false,
    to: localePath({ name: "news" }),
  },
  {
    title: item.title,
    disabled: false,
  },
];
</script>
<template>
  <LayoutsCommon :title="item.title" :items="bh">
    <ContentRenderer :value="item" />
  </LayoutsCommon>
</template>
