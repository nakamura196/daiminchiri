<script setup lang="ts">
interface PropType {
  aggregationConfig: any[];
  aggregations: any;
}

withDefaults(defineProps<PropType>(), {
  aggregationConfig: () => [],
  aggregations: () => {},
});

const emits = defineEmits<{ (e: string): void }>();

const close = () => {
  emits("close");
};
</script>

<template>
  <template v-for="conf in aggregationConfig">
    <div
      v-if="
        !conf.hide &&
        aggregations[conf.key] &&
        aggregations[conf.key].buckets.length > 0
      "
      class="mb-5"
    >
      <MoleculesSearchFacet
        :buckets="aggregations[conf.key].buckets"
        :label="conf.label"
        :id="conf.key"
        @close="close"
      />
    </div>
  </template>
</template>
