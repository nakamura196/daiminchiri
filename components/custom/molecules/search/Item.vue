<script setup lang="ts">
// import { OsdCustomViewer } from "@nakamura196/osd-custom-viewer";
// const route = useRoute();
import { mdiCommentQuoteOutline } from "@mdi/js";

const runtimeConfig = useRuntimeConfig();

const localePath = useLocalePath();

interface PropType {
  item?: any;
}

const props = withDefaults(defineProps<PropType>(), {
  item: () => {},
});

const publicRuntimeConfig = useRuntimeConfig().public;
const details: any = publicRuntimeConfig.default.details;

const manifest =
  "https://gist.githubusercontent.com/nakamura196/91c2aab79528ee285270178aee0a7593/raw/cee7289eaaf7b6a623fcb1ffe2db6c8e833680f9/manifest.json";

// console.log(props.item)
</script>

<template>
  <div>
    <div class="bg-sub">
      <v-container class="py-0">
        <ClientOnly>
          <OsdCustomViewer
            :height="300"
            :manifest="manifest"
            :default_region="item.xywh"
          ></OsdCustomViewer>
        </ClientOnly>
      </v-container>
    </div>
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
          <template v-for="detail in details">
            <tr v-if="item[detail.value]">
              <td width="30%" class="py-2">{{ $t(detail.title) }}</td>
              <td class="py-2">
                <!--{{ formatArrayValue(item[key]) }}-->
                <template v-if="Array.isArray(item[detail.value])">
                  <template v-for="(value, index) in item[detail.value]">
                    <span v-if="index > 0">, </span>
                    <CustomMoleculesSearchDetail :id="item._id" :config="detail" :value="value"></CustomMoleculesSearchDetail>
                  </template>
                </template>
                <template v-else>
                  <CustomMoleculesSearchDetail :id="item._id" :config="detail" :value="item[detail.value]"></CustomMoleculesSearchDetail>
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
        <p style="word-wrap: break-word">
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
