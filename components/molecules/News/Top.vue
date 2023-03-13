<script setup lang="ts">
const localePath = useLocalePath();

const { data } = await useAsyncData("home", () => queryContent("/").findOne());
</script>
<template>
    <div class="bg-sub">
      <v-container class="pa-10">
        <p class="mb-5">
          <b>お知らせ</b>
          <span class="ml-5"
            ><nuxt-link :to="localePath({ name: 'news' })"
              ><small>すべて</small></nuxt-link
            ></span
          >
        </p>

        <MoleculesNewsList></MoleculesNewsList>
      </v-container>
    </div>
</template>