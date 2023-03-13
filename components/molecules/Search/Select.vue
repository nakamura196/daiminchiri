<script setup lang="ts">
interface Item {
  title: string;
  value: string;
}

interface PropType {
  modelValue: string | number;
  items: Item[];
  type?: string;
  label: string;
}

const props = withDefaults(defineProps<PropType>(), {
  modelValue: () => "",
  items: () => [],
  type: () => "string",
  label: () => "",
});

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
const onInputText = (e: Event) => {
  emits("update:modelValue", props.type === "string" ? String(e) : Number(e));
};
const modelValue_: any = ref(props.modelValue);
</script>
<template>
  <v-select
    v-model="modelValue_"
    density="compact"
    variant="outlined"
    hide-details
    outlined
    :label="$t(label)"
    :items="items"
    dense
    @update:model-value="onInputText"
  ></v-select>
</template>
