<script setup lang="ts">
interface PropType {
  items: any[];
  layout: string;
}

withDefaults(defineProps<PropType>(), {
  items: () => [],
  layout: () => "list",
});
</script>
<template>
  <template v-if="layout === 'list'">
    <CustomMoleculesSearchList :items="items"></CustomMoleculesSearchList>
  </template>
  <template v-else-if="layout === 'grid'">
    <CustomMoleculesSearchGrid :items="items"></CustomMoleculesSearchGrid>
  </template>
  <template v-else-if="layout === 'map'">
    <CustomMoleculesSearchMap :items="items"></CustomMoleculesSearchMap>
  </template>
</template>
