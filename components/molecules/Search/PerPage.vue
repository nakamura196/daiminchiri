<script setup lang="ts">
interface Item {
  title: string;
  value: string;
}

interface PropType {
  modelValue: number;
  items: Item[];
}

const props = withDefaults(defineProps<PropType>(), {
  modelValue: () => 0,
  items: () => [],
});

const emits = defineEmits<{ (e: "update:modelValue", value: number): void }>();
const onInputText = (e: Event) => {
  emits("update:modelValue", Number(e));
};
const modelValue_ = ref(props.modelValue);
</script>
<template>
  <v-select
    v-model="modelValue_"
    density="compact"
    variant="outlined"
    hide-details
    outlined
    :label="$t('items_per_page')"
    :items="items"
    dense
    @update:model-value="onInputText"
  ></v-select>
</template>
