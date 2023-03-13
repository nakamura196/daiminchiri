<script setup lang="ts">
import { useDisplay } from "vuetify";

import { Menu } from "@/types/Menu";
import { mdiOpenInNew } from "@mdi/js";

const localePath = useLocalePath();

const drawer = ref(false);

/*
interface PropType {
  menus?: any;
}
*/

const { theme } = useSettings();

const runtimeConfig = useRuntimeConfig();
const appUrl = runtimeConfig.appUrl;

watch(theme, () => {
  localStorage.setItem(`${appUrl}-theme`, theme.value);
});

/*
withDefaults(defineProps<PropType>(), {
  menus: () => [],
});
*/

const menus = runtimeConfig.menus 

const menus_: Menu[] = menus /*[]*/ // runtimeConfig.menus 
/*[
  {
    title: "top",
    to: localePath({ name: "index" }),
    header: true,
  },
];*/ 

const { sm, xs } = useDisplay();

const isMobile = computed(() => {
  return sm.value || xs.value;
});
</script>

<template>
  <v-navigation-drawer v-model="drawer" temporary location="right">
    <v-list>
      <v-list-item
        v-for="(item, key) in menus_"
        :key="key"
        :to="item.to ? localePath(item.to) : ''"
        :href="item.href ? item.href : ''"
        :target="item.target ? item.target : ''"
        exact
        link
      >
        <v-list-item-title>{{ $t(item.title) }} <template v-if="item.target">
              <v-icon>{{ mdiOpenInNew }}</v-icon>
            </template></v-list-item-title>
      </v-list-item>
      <v-list-item>
        <MoleculesMenuTheme v-model="theme"></MoleculesMenuTheme>
      </v-list-item>
      <v-list-item>
        <MoleculesMenuLanguage></MoleculesMenuLanguage>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar color="black" flat :absolute="true" density="compact">
    
    <v-toolbar-title>
      <nuxt-link :to="localePath({name: 'index'})" style="text-decoration: none; color: inherit"
        >{{ $t($config.title) }}
      </nuxt-link>
    </v-toolbar-title>

    <!-- <v-spacer></v-spacer> -->

    <ClientOnly>
      <template v-if="!isMobile">

        <template v-for="menu in menus_">
          <v-btn
            class="mx-1"
            v-if="menu.header"
            :to="menu.to ? localePath(menu.to) : ''"
            :href="menu.href ? menu.href : ''"
            :target="menu.target ? menu.target : ''"
          >
            {{ $t(menu.title) }}

            <template v-if="menu.target">
              <v-icon>{{ mdiOpenInNew }}</v-icon>
            </template>
          </v-btn>
        </template>

        <MoleculesMenuTheme
          v-if="$config.public.menu_mode"
          v-model="theme"
        ></MoleculesMenuTheme>
        <MoleculesMenuLanguage></MoleculesMenuLanguage>
      </template>
    </ClientOnly>

    <v-app-bar-nav-icon @click="drawer = !drawer" />
  </v-app-bar>
</template>
