<script setup lang="ts">
const { t, locale } = useI18n();

const localePath = useLocalePath();

const slug = useRoute().params.slug;

const item = await queryContent(`/${locale.value}/page/${slug}`).findOne();

const bh = ref([
  {
    title: t("top"),
    disabled: false,
    to: localePath({
      name: "index",
    }),
  },

  {
    title: t(item.title || ""),
    disabled: false,
  },
]);

const $t = useI18n().t;
const runtimeConfig = useRuntimeConfig();
const appUrl = runtimeConfig.public.appUrl;
const title = t(item.title || "");

useJsonld([
  {
    itemListElement: [
      {
        position: 1,
        name: $t("top"),
        item: appUrl,
        "@type": "ListItem",
      },
    ],
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
  },
]);

useHead({
  titleTemplate: `${title} - %s`,
  meta: [{ property: "og:title", content: `${title} - %s` }],
});
</script>

<template>
  <LayoutsCommon :items="bh">
    <div>
      <ContentRenderer class="nuxt-content" :value="item" />
    </div>
  </LayoutsCommon>
</template>
