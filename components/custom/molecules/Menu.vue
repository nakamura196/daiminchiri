<script setup lang="ts">
import { mdiAssistant, mdiBook, mdiInformation } from "@mdi/js";

const localePath = useLocalePath();

const $t = useI18n().t;

const items: any[] = [
  {
    label: $t("このサイトについて"),
    to: localePath({
      // name: 'page-slug',
      name: "page-slug",
      params: {
        slug: "about",
      },
    }),
    icon: mdiInformation,
  }
  /*,
  {
    label: $t("リソース"),
    to: localePath({
      // name: 'page-slug',
      name: "page-slug",
      params: {
        slug: "resources",
      },
    }),
    icon: mdiBook,
  }
  */,
  {
    label: $t("支援する"),
    to: localePath({
      // name: 'page-slug',
      name: "page-slug",
      params: {
        slug: "support",
      },
    }),
    icon: mdiAssistant,
  },
];
</script>
<template>
  <div class="my-10">
    <h3 class="text-center">{{ $t("menu") }}</h3>
    <v-row class="mt-5">
      <v-col :md="12 / items.length" cols="12" v-for="(item, key) in items">
        <v-card flat variant="outlined">
          <div class="px-4">
            <h4>
              <v-icon class="mb-1 mr-1">{{ item.icon }}</v-icon>
              <nuxt-link :to="item.to">{{ item.label }}</nuxt-link>
            </h4>

            <span v-if="item.description">{{ item.description }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
