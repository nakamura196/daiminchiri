<script setup lang="ts">
import { mdiMagnify } from "@mdi/js";

const localePath = useLocalePath();

interface PropType {
  label?: string;
}

withDefaults(defineProps<PropType>(), {
  label: "add_a_search_term",
});

const router = useRouter();

const route = useRoute();

const keyword = ref(route.query.keyword || "");

const trigger = (event: any) => {
  // 日本語入力中のEnterキー操作は無効にする
  if (event.keyCode !== 13) return;
  execSearch();
};

const execSearch = () => {

  const runtimeConfig = useRuntimeConfig()
  const inherit_facet = runtimeConfig.public.inherit_facet

  const query = inherit_facet ? JSON.parse(JSON.stringify(route.query)) : {};
  query.page = 1;
  query.keyword = keyword.value || "";

  const path = localePath({
    name: "resource",
    params: {
      resource: "item",
    },
    query,
  });

  router.push(path);
};

watch(route, () => {
  keyword.value = route.query.keyword || "";
});
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field
        variant="outlined"
        v-model="keyword"
        @keydown.enter="trigger"
        density="compact"
        single-line
        :label="$t(label)"
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-btn color="primary" flat @click="execSearch"
        ><v-icon>{{ mdiMagnify }}</v-icon> {{ $t("search") }}</v-btn
      >
    </v-col>
  </v-row>
</template>
