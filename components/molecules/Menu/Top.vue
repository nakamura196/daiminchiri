<script setup lang="ts">

const localePath = useLocalePath();

const menus = [
  {
    "label": "about",
    "to": {
      "name": "page-slug",
      "params": {
        "slug": "about"
      }
    },
    description: "このサイトは、ＷＥＢ上で大明地理之図の画像を公開するとともに、絵図に描き込まれた地名等の情報を分析するために構築されたデジタルアーカイブです。"
  },
  {
    "label": "絵図を見る",
    "href": "/mirador/?manifest=/iiif/main/manifest.json&annotationState=on",
    description: "大明地理之図の画像を閲覧できます。図につけられた注釈（アノテーション）の表示／非表示を切り替えることができます。"
  },
  {
    "label": "search",
    "to": {
      "name": "resource",
      "params": {
        "resource": "item"
      }
    },
    description: "大明地理之図に書き込まれた文字などの情報（全3,897件）を検索できます。"
  },
  {
    "label": "advanced",
    "to": {
      "name": "resource-advanced",
      "params": {
        "resource": "item"
      }
    },
    description: "大明地理之図に書き込まれた文字などの情報（全3,897件）について、地名・説明／地名種別／区域／図符等などの詳細を指定した検索ができます。"
  },
  {
    "label": "map",
    "to": {
      "name": "map"
    },
    "description": "大明地理之図に書き込まれた地名について、現在の地図上で位置を確認できます。"
  },
  {
    "label": "dataset",
    "to": {
      "name": "dataset"
    },
    "description": "大明地理之図データベースの地名をまとめて利用するためのデータセットを提供しています。"
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
