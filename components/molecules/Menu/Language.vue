<script setup lang="ts">
import { mdiChevronDown } from "@mdi/js";

const switchLocalePath = useSwitchLocalePath()
const /*i18n*/ {locale} = useI18n();

const changeLocale = (locale_: string) => {
  // i18n.setLocale(locale);
  // locale.value = locale;
  locale.value = locale_;
};
</script>
<template>
  <client-only>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn variant="text" v-bind="props">
          {{ $i18n.locale === "ja" ? "日本語" : "English" }}
          <v-icon> {{ mdiChevronDown }} </v-icon>
        </v-btn>
      </template>
      <v-card flat>
        <v-list>
          <!-- @click="changeLocale('ja')" -->
          <v-list-item :to="switchLocalePath('ja')" :active="$i18n.locale === 'ja'"
            >日本語</v-list-item
          >
          <!-- @click="changeLocale('en')" -->
          <v-list-item :to="switchLocalePath('en')" :active="$i18n.locale === 'en'"
            >English</v-list-item
          >
        </v-list>
      </v-card>
    </v-menu>
  </client-only>
</template>
