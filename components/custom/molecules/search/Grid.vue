<script setup lang="ts">
interface PropType {
  items: any[];
}

withDefaults(defineProps<PropType>(), {
  items: () => [],
});

const localePath = useLocalePath();

const keys = [
  {
    title: "絵図",
    value: "description",
  },
  {
    title: "分類",
    value: "ne_class",
  },
];

const publicRuntimeConfig = useRuntimeConfig().public;
const no_image = publicRuntimeConfig.search.no_image;
</script>
<template>
  <v-row>
    <v-col cols="6" sm="3" v-for="item in items">
      <v-card variant="outlined">
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
        <v-card-title>
          <nuxt-link
            :to="
              localePath({
                name: 'resource-id',
                params: { resource: 'item', id: item._id },
              })
            "
            >{{ item.label }}</nuxt-link
          >
        </v-card-title>
        <v-card-text>
          <div>
            <span v-for="key in keys">
              <template v-if="item[key.value]">
                <span>{{ key.title }}</span
                >: <span>{{ item[key.value] }}</span>
              </template>
            </span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
