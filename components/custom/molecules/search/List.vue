<script setup lang="ts">
// import { hightlight } from "~/utils/search";

const route = useRoute();

interface PropType {
  items: any[];
}

withDefaults(defineProps<PropType>(), {
  items: () => [],
});

const localePath = useLocalePath();

const publicRuntimeConfig = useRuntimeConfig().public;
const no_image = publicRuntimeConfig.search.no_image;
const keys: any[] = publicRuntimeConfig.default.keys;

const itaiji = publicRuntimeConfig.itaiji;
</script>
<template>
  <v-card variant="outlined" v-for="item in items" :key="item.id" class="mb-4">
    <div>
      <v-row>
        <v-col cols="12" sm="3">
          <nuxt-link
            :to="
              localePath({
                name: 'resource-id',
                params: { resource: 'item', id: item._id },
              })
            "
          >
            <v-img
              contain
              width="100%"
              style="height: 150px"
              class="bg-sub"
              :src="item.image || no_image"
            ></v-img>
          </nuxt-link>
        </v-col>
        <v-col cols="12" sm="9">
          <h4>
            <nuxt-link
              :to="
                localePath({
                  name: 'resource-id',
                  params: {
                    resource: 'item',
                    id: item._id,
                  },
                })
              "
              v-html="highlight(route, item.label, 'label', item.matches, itaiji)"
            >
            </nuxt-link>
          </h4>

          <div class="mb-4">
            <span v-for="key in keys">
              <template v-if="item[key.value]">
                <span>{{ key.title }}</span
                >:
                <span
                  v-html="
                    highlight(route, item[key.value], key.value, item.matches, itaiji)
                  "
                ></span>&nbsp;
              </template>
            </span>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
