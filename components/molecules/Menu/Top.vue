<script setup lang="ts">

const localePath = useLocalePath();

const menus = [
  {
    "label": "このサイトについて",
    "to": {
      "name": "page-slug",
      "params": {
        "slug": "about"
      }
    },
    "description": "このサイトは、...。"
  },
  {
    "label": "絵図を見る",
    "href": "/mirador/?manifest=/iiif/main/manifest.json&annotationState=on",
    "description": "このサイトは、...。"
  },
  {
    "label": "検索",
    "to": {
      "name": "resource",
      "params": {
        "resource": "item"
      }
    },
    "description": "このサイトは、...。"
  },
  {
    "label": "現代地図",
    "to": {
      "name": "map"
    },
    "description": "このサイトは、...。"
  }
]
</script>
<template>
      <v-row>
        <v-col cols="12" sm="6" v-for="menu in menus">
          <v-card variant="outlined">
            <div class="pa-4">

              <template v-if="menu.to">
                <nuxt-link :to="localePath(menu.to)">{{ menu.label }}</nuxt-link>
              </template>
              <template v-else>
                <a :href="menu.href" :target="menu.target">
                  {{ menu.label }}
                </a>
                </template> 
              <div class="mt-2">{{ menu.description }}</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
</template>
