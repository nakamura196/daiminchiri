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
    }
  },
  {
    "label": "絵図を見る",
    "href": "/mirador/?manifest=/iiif/main/manifest.json&annotationState=on"
  },
  {
    "label": "検索",
    "to": {
      "name": "resource",
      "params": {
        "resource": "item"
      }
    }
  },
  {
    "label": "詳細検索",
    "to": {
      "name": "resource-advanced",
      "params": {
        "resource": "item"
      }
    }
  },
  {
    "label": "現代地図",
    "to": {
      "name": "map"
    },
    "description": ""
  },
  {
    "label": "dataset",
    "to": {
      "name": "dataset"
    },
    "description": ""
  }
]
</script>
<template>
      <v-row>
        <v-col cols="12" sm="6" v-for="menu in menus">
          <v-card variant="outlined">
            <div class="pa-4">

              <template v-if="menu.to">
                <nuxt-link :to="localePath(menu.to)">{{ $t(menu.label) }}</nuxt-link>
              </template>
              <template v-else>
                <a :href="menu.href" :target="menu.target">
                  {{ menu.label }}
                </a>
                </template> 
              <div class="mt-2" v-if="menu.description">{{ menu.description }}</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
</template>
