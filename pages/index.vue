<script setup lang="ts">
const {locale} = useI18n()
const data = await queryContent(`/${locale.value}/`).findOne();
</script>
<template>
  <div>
    <MoleculesMenuTopImage></MoleculesMenuTopImage>

    <v-container>
      <ContentRenderer :value="data" />
    </v-container>

    <div class="bg-sub">
      <v-container class="pa-10">
        <p class="mb-5">
          <b>{{ $t("News") }}</b>
          <span class="ml-5"
            ><nuxt-link :to="localePath({ name: 'news' })"
              ><small>{{ $t("all") }}</small></nuxt-link
            ></span
          >
        </p>

        <MoleculesNewsList></MoleculesNewsList>
      </v-container>
    </div>
  </div>
</template>
