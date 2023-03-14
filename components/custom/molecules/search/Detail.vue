<script setup lang="ts">
import { mdiMagnify } from "@mdi/js";

const publicRuntimeConfig = useRuntimeConfig().public;
const t_all = publicRuntimeConfig.t.all;

interface PropType {
  config: any;
  value: any;
  id: string;
}

const props = withDefaults(defineProps<PropType>(), {
  config: () => {},
  value: () => "",
  id: () => "",
});

const localePath = useLocalePath();

const getQuery = (key: string, value: any) => {
  const relatedQuery: any = {};
  relatedQuery[`f-${key}`] = value;
  return relatedQuery;
};
</script>
<template>
  <span>
    {{ t_all ? $t(value) : value }}
    <template v-if="config.type === 'resource'">
      &nbsp;
      <nuxt-link
        :to="
          localePath({
            name: 'resource',
            params: { resource: 'item' },
            query: getQuery(config.value, value),
          })
        "
      >
        <v-icon>{{ mdiMagnify }}</v-icon>
      </nuxt-link>
    </template>
    <template v-else-if="config.value === '関連ID'">
      <template v-if="value !== id"
        >&nbsp;<nuxt-link
          :to="
            localePath({
              name: 'resource-id',
              params: { resource: 'item', id: value },
            })
          "
        >
          {{ $t("詳細") }}
        </nuxt-link>
      </template>
    </template>
  </span>
</template>
