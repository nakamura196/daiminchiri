<script setup lang="ts">
import { mdiChevronDown } from "@mdi/js";

interface PropType {
  modelValue: string;
}

withDefaults(defineProps<PropType>(), {
  modelValue: () => "",
});

const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();
const changeTheme = (theme_: string) => {
  emits("update:modelValue", theme_);
};

const modes: any = [
  {
    label: "Light Mode",
    value: "light",
  },
  {
    label: "Dark Mode",
    value: "dark",
  },
];

const modeMap = computed(() => {
  const modeMap_: any = {};
  modes.forEach((mode: any) => {
    modeMap_[mode.value] = mode;
  });
  return modeMap_;
});
</script>
<template>
  <client-only>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn variant="text" v-bind="props">
          {{ $t(modeMap[modelValue || "light"].label) }}
          <v-icon> {{ mdiChevronDown }} </v-icon>
        </v-btn>
      </template>
      <v-card flat>
        <v-list>
          <v-list-item
            v-for="item in modes"
            :active="modelValue === item.value"
            @click="changeTheme(item.value)"
            >{{ $t(item.label) }}</v-list-item
          >
        </v-list>
      </v-card>
    </v-menu>
  </client-only>
</template>
