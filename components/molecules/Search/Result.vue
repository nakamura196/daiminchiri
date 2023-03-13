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
  <template v-else>
    <CustomMoleculesSearchGrid :items="items"></CustomMoleculesSearchGrid>
  </template>
</template>
