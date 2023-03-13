<script setup lang="ts">
interface PropType {
  value: number;
}

withDefaults(defineProps<PropType>(), {
  value: 0,
});
</script>
<template>
  <span>
    {{ $t("search_result") }}:
    {{ value.toLocaleString() }}
  </span>
</template>
