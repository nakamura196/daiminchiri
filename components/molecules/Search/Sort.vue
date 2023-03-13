<script setup lang="ts">
interface Item {
  title: string;
  value: string;
}

interface PropType {
  modelValue: string;
  items: Item[];
}

const props = withDefaults(defineProps<PropType>(), {
  modelValue: () => "",
  items: () => [],
});

const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();
const onInputText = (e: Event) => {
  emits("update:modelValue", e);
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
