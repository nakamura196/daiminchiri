<script setup lang="ts">
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";

interface PropType {
  modelValue: number;
  length: number;
}

const props = withDefaults(defineProps<PropType>(), {
  modelValue: () => 0,
  length: () => 0,
});

const emits = defineEmits<{ (e: "update:modelValue", value: number): void }>();

const movePage = (e: number) => {
  // 1より小さい場合は1にする
  if (e < 1) e = 1;
  // lengthより大きい場合にはlengthにする
  if (e > props.length) e = props.length;
  modelValue_.value = e;
  emits("update:modelValue", e);
};

const modelValue_ = ref(props.modelValue)/*computed(() => {
  return props.modelValue;
}); // ref(props.modelValue);*/

watch(props, (e) => {
    modelValue_.value = e.modelValue;
});
</script>
<template>
  <v-row align="center" justify="center" dense>
    <v-col cols="4">
      <v-text-field
        v-model="modelValue_"
        @change="movePage(Number(modelValue_))"
        dense
        hide-details
        density="compact"
        variant="outlined"
        single-line
      >
      </v-text-field>
    </v-col>
    <v-col cols="8">
      <small>/ {{ length }}</small>

      <v-btn
        class="ma-1"
        icon
        flat
        size="x-small"
        @click="movePage(modelValue_ - 1)"
        color="primary"
        :disabled="modelValue_ === 1"
        variant="text"
        ><v-icon>{{ mdiChevronLeft }}</v-icon></v-btn
      >
      <v-btn
        class="ma-1"
        size="x-small"
        depressed
        flat
        icon
        color="primary"
        @click="movePage(modelValue_ + 1)"
        :disabled="modelValue_ >= length"
        variant="text"
        ><v-icon>{{ mdiChevronRight }}</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>
