<script setup lang="ts">
// const route = useRoute();
import { mdiCommentQuoteOutline } from "@mdi/js";

const runtimeConfig = useRuntimeConfig();

const localePath = useLocalePath();

interface PropType {
  item?: any;
}

withDefaults(defineProps<PropType>(), {
  item: () => {},
});

const values = [
  "_id",
  "label",
  "見出し読み",
  "ローマ字1",
  "ローマ字2",
  "対訳語",
  "説明文",
  "related",
  "著者",
  "出典",
  "ページ番号",
  "出版社",
  "出版年",
  "言語",
  "時代",
];
</script>

<template>
  <div>
    <v-container>
      <h1 class="mb-10">{{ item.label }}</h1>

      <div class="text-center my-5" v-if="false">
        <span class="mr-4">
          <v-btn variant="flat" icon href="https://json-ld.org/">
            <img
              style="border: 0px"
              width="32"
              src="https://json-ld.org/images/json-ld-logo-64.png"
              alt="JSON-LD-logo-64"
            />
          </v-btn>
        </span>
        <span class="ml-2">
          <!-- :icon="mdiCommentQuoteOutline"  -->
          <v-btn variant="flat" icon>
            <!-- <v-icon>{{mdiCommentQuoteOutline}}</v-icon> -->
            <v-icon>{{ mdiCommentQuoteOutline }}</v-icon>
          </v-btn>
          <!--
        <a href="https://json-ld.org/" title="JSON-LD">
          
          <img style="border:0px;" width="32" src="https://json-ld.org/images/json-ld-logo-64.png" alt="JSON-LD-logo-64"/></a> -->
        </span>
        <span class="ml-2">
          <v-btn variant="flat" icon>
            <!-- <v-icon>{{mdiCommentQuoteOutline}}</v-icon> -->
            <v-icon>{{ mdiCommentQuoteOutline }}</v-icon>
          </v-btn>
          <!--
        <a href="https://json-ld.org/" title="JSON-LD"
          ><img
            style="border: 0px"
            width="32"
            src="https://json-ld.org/images/json-ld-logo-64.png"
            alt="JSON-LD-logo-64"
        /></a>
        -->
        </span>
      </div>

      <v-table class="my-5 mb-10">
        <!--
        <thead>
          <tr>
            <th class="text-left">
              {{ $t("field") }}
            </th>
            <th class="text-left">
              {{ $t("value") }}
            </th>
          </tr>
        </thead>
        -->
        <tbody>
          <template v-for="key in values">
            <tr v-if="item[key]">
              <td class="py-2">{{ $t(key) }}</td>
              <td class="py-2">
                <!--{{ formatArrayValue(item[key]) }}-->
                <template v-if="Array.isArray(item[key])">
                  <template v-for="(value, index) in item[key]">
                    <span v-if="index > 0">, </span>
                    <template v-if="key === 'related'">
                      <nuxt-link
                        :to="
                          localePath({
                            name: 'resource',
                            params: { resource: 'item' },
                            query: { keyword: value },
                          })
                        "
                      >
                        {{ $t(value) }}
                      </nuxt-link>
                    </template>
                    <template v-else>
                      {{ $t(value) }}
                    </template>
                  </template>
                </template>
                <template v-else>
                  {{ item[key] }}
                </template>
              </td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-container>

    <v-sheet class="bg-sub">
      <v-container class="text-center pb-10">
        <h4 class="mb-4">{{ $t("利用条件") }}</h4>
        <p style="word-wrap: break-word; ">
          <nuxt-link
            :to="localePath({ name: 'page-slug', params: { slug: 'use' } })"
          >
            {{ runtimeConfig.public.appUrl + "/page/use/" }}
          </nuxt-link>
        </p>
      </v-container>
    </v-sheet>

    <v-container class="text-center pt-10">
      <h4 class="mb-4">{{ $t("最終更新日") }}</h4>
      <p>2023-03-31</p>
    </v-container>
  </div>
</template>
