<script setup lang="ts">
const slug = useRoute().params.slug;
const { locale } = useI18n();

const { t } = useI18n();

const item = {
  title: "advanced",
};

const localePath = useLocalePath();

const bh = [
  {
    title: t("top"),
    disabled: false,
    to: localePath({ name: "index" }),
  },
  {
    title: t(item.title),
    disabled: false,
  },
];

const query = useRoute().query;

const items2 = computed(() => {
  //const items = options.value.find((o) => o.key === "区域1")?.items;
  // return items ? items : [];
  return ["中村"];
});

const options = ref([
  {
    label: "地名・説明",
    key: "label",
    type: "text",
    value: query["q-label"],
  },
  {
    label: "地名種別",
    key: "ne_class",
    type: "select",
    value: query["f-ne_class"],
  },
  {
    label: "区域1",
    key: "区域1",
    type: "select",
    value: "",
  },
  {
    label: "区域2",
    key: "区域2",
    type: "select",
    items: items2,
    value: "",
  },
  {
    label: "区域色",
    key: "区域色",
    type: "select",
    items: ["黄"],
    value: "",
  },
  {
    label: "図符等",
    key: "図符等",
    type: "select",
    items: [],
    value: "",
  },
]);

const search = () => {
  const options_ = options.value;

  const query = JSON.parse(JSON.stringify(useRoute().query));

  for (const option of options_) {
    const value = option.value;
    if (value) {
      const prefix = option.type === "text" ? "q-" : "f-";
      query[prefix + option.key] = value;
    }
  }

  const path: any = {
    name: "resource",
    params: useRoute().params,
    query,
  };

  useRouter().push(localePath(path));
};
</script>
<template>
  <LayoutsCommon :title="item.title" :items="bh">
    <h1>{{ $t(item.title) }}</h1>

    <div class="mt-5 text-center">
      <v-btn color="primary" flat @click="search()">{{ $t("search") }}</v-btn>
    </div>

    <ClientOnly>
      <v-row v-for="option in options" class="my-5" dense>
        <v-col cols="12" sm="3">
          {{ option.label }}
        </v-col>
        <v-col cols="12" sm="9">
          <template v-if="option.type === 'text'">
            <v-text-field
              v-model="option.value"
              hide-details
              single-line
              variant="outlined"
              density="compact"
            ></v-text-field>
          </template>
          <template v-else-if="option.type === 'select'">
            <v-select
              v-model="option.value"
              :items="option.items"
              hide-details
              single-line
              variant="outlined"
              density="compact"
            ></v-select>
          </template>
        </v-col>
      </v-row>
    </ClientOnly>

    <div class="mt-5 text-center">
      <v-btn color="primary" flat @click="search()">{{ $t("search") }}</v-btn>
    </div>
  </LayoutsCommon>
</template>
