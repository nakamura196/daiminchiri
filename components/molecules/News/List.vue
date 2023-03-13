<script setup lang="ts">
const {locale} = useI18n()
const items = await queryContent(`/${locale.value}/news`).find();
const localePath = useLocalePath();
</script>
<template>
  <v-list-item
    v-for="(item, key) in items"
    :key="key"
    :to="localePath({ name: 'news-slug', params: { slug: item.slug } })"
  >
  {{ item.date.split("T")[0] }} {{ item.title }} 
  </v-list-item>
</template>
