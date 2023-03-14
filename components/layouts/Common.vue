<script setup lang="ts">
import { Item } from "@/types/Item";

interface PropType {
  items?: Item[];
  container?: boolean;
}

withDefaults(defineProps<PropType>(), {
  items: () => [],
  container: () => true,
});
</script>
<template>
  <div>
    <MoleculesMenuBreadCrumbs
      v-if="items.length > 0"
      :items="items"
    ></MoleculesMenuBreadCrumbs>
    <div>
      <template v-if="container">
        <v-container class="my-5">
          <slot />
        </v-container>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>
