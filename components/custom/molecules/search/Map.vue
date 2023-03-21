<script setup lang="ts">
import { useDisplay } from "vuetify";
import { OsdCustomViewer } from "@nakamura196/osd-custom-viewer";
import "@nakamura196/osd-custom-viewer/dist/style.css";
import { mdiMagnify, mdiSelectSearch } from "@mdi/js";
import { mdiHome, mdiMinusCircleOutline, mdiPlusCircleOutline } from "@mdi/js";
import { $search } from "~/utils/search";

const localePath = useLocalePath();

const { sm, xs } = useDisplay();

const isMobile = computed(() => {
  return sm.value || xs.value;
});

const id = "abc";
const page = ref<number>(1);
const fit_id = ref("");

const manifest =
  "https://gist.githubusercontent.com/nakamura196/91c2aab79528ee285270178aee0a7593/raw/cee7289eaaf7b6a623fcb1ffe2db6c8e833680f9/manifest.json";

interface PropType {
  items: any[];
}

const props = withDefaults(defineProps<PropType>(), {
  items: () => [],
});

const items2 = ref<any[]>([]);
const regions = ref<string[]>([]);
const targetIdMap: any = ref(null);

const reload = async () => {
  fit_id.value = "";
  const route = useRoute();

  const queryAll = JSON.parse(JSON.stringify(route.query));
  queryAll.size = 500;

  const results = await $search(queryAll, "fuse");

  const items = results.hits.hits;

  const items2_ = [];
  const targetIdMap_: any = {};
  const regions_ = [];

  for (const item of items) {
    /*
    const item2 = {
      _id: item._id,
      name: item.label,
      // category1: item.category1,
      // category2: item.category2,
      // fit: item.fit,
      // raw: item.raw,
      target: item.target,
    };
    */

    regions_.push(item.target);
    targetIdMap_[item.target] = item._id;
    items2_.push(item);
  }

  regions.value = regions_;
  items2.value = items2_;
  targetIdMap.value = targetIdMap_;
};

/*
onMounted(() => {
  reload();
});
*/
reload();

watch(
  () => props.items,
  () => {
    /*
    items2.value = [];
    regions.value = [];
    targetIdMap.value = {};
    */
    reload();
  }
);

const search = ref("");

const { t } = useI18n();

const itemsPerPage = ref(-1);

const headers = ref([
  {
    title: t("name"),
    key: "name",
  },
  /*
  {
    title: t("category"),
    key: "category1",
  },
  {
    title: t("kigo"),
    key: "category2",
  },
  */
  {
    title: "",
    sortable: false,
    key: "fit",
  },
]);

const updatedSeletecd = (e: any) => {
  const selected_id = e.selected_id;
  const id = targetIdMap.value[selected_id];

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const publicRuntimeConfig = useRuntimeConfig().public;
const keys: any[] = publicRuntimeConfig.default.keys;
</script>
<template>
  <v-row dense>
    <v-col cols="12" sm="5" v-if="!isMobile">
      <!--
            <v-text-field
                class="mb-4"
                v-model="search"
                :append-icon="mdiMagnify"
                :label="$t('add_a_search_term')"
                single-line
                density="compact"
                variant="outlined"
                hide-details
            ></v-text-field>
            -->
      <v-card variant="outlined">
        <div style="max-height: 632px; overflow-y: auto">
          <!--
                <v-data-table
                    :search="search"
                    density="compact"
                    v-model:items-per-page="itemsPerPage"
                    :headers="headers"
                    :items="items2"
                    item-value="name"
                >
                    <template v-slot:item.fit="{ item }">
                    <v-btn icon flat size="small" @click="fit_id = item.raw.target">
                        <v-icon color="primary">{{ mdiSelectSearch }}</v-icon></v-btn
                    >
                    </template>
                </v-data-table>
                -->

          <v-list>
            <v-list-item v-for="(item, i) in items2" :key="item.id">
              <template v-if="i != 0">
                <v-divider></v-divider>
              </template>

              <div :id="item._id">
                <nuxt-link
                  :to="
                    localePath({
                      name: 'resource-id',
                      params: { id: item._id },
                    })
                  "
                  >{{ item.label }}</nuxt-link
                >
              </div>

              <div class="mt-2">
                <template v-for="key in keys">
                  <template v-if="item[key.value]">
                    <span>{{ key.title }}</span
                    >: {{ item[key.value] }}&nbsp;
                  </template>
                </template>
              </div>

              <div class="text-right">
                <v-btn icon flat size="small" @click="fit_id = item.target">
                  <v-icon color="primary">{{ mdiSelectSearch }}</v-icon>
                </v-btn>
              </div>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" :sm="!isMobile ? 7 : 12">
      <div style="height: 32px" class="text-center bg-sub">
        <!-- c_grey -->

        <v-btn :id="`osv-${id}-next`" size="x-small" variant="text">
          <!-- icon -->
          <!--
                <v-icon>{{ mdiArrowLeftDropCircleOutline }}</v-icon>
                <v-tooltip activator="parent" location="bottom">{{
                $t("Next")
                }}</v-tooltip>
                -->
          {{ $t("Next") }}
        </v-btn>

        <v-btn :id="`osv-${id}-previous`" size="x-small" variant="text">
          <!-- icon -->
          <!--
                <v-icon>{{ mdiArrowRightDropCircleOutline }}</v-icon>
                <v-tooltip activator="parent" location="bottom">{{
                $t("Previous")
                }}</v-tooltip>
                -->
          {{ $t("Prev") }}
          <!-- ious -->
        </v-btn>

        <span style="vertical-align: middle"> | </span>

        <v-btn :id="`osv-${id}-zoom-in`" size="x-small" icon variant="text">
          <v-icon>{{ mdiPlusCircleOutline }}</v-icon>
        </v-btn>

        <v-btn :id="`osv-${id}-zoom-out`" size="x-small" icon variant="text">
          <v-icon>{{ mdiMinusCircleOutline }}</v-icon>
        </v-btn>

        <v-btn :id="`osv-${id}-home-button`" size="x-small" icon variant="text">
          <v-icon>{{ mdiHome }}</v-icon>
        </v-btn>

        <!-- 要検討 -->
        <template v-if="false">
            <span
            v-if="$refs.ocv && $refs.ocv.size > 0"
            style="vertical-align: middle"
            >
            <span> | </span>
            <small>{{ page }} / {{ $refs.ocv.size }}</small>
            </span>

        </template>

        <span style="vertical-align: middle"> | </span>

        <v-btn
          :href="`${manifest}?manifest=${manifest}`"
          target="_blank"
          icon
          size="x-small"
          variant="text"
        >
          <v-img
            width="20"
            contain
            src="https://cultural.jp/img/icons/iiif-logo.svg"
          ></v-img>
        </v-btn>
      </div>

      <!--
      <OsdCustomViewer
        v-if="targetIdMap"
        ref="ocv"
        :id="id"
        @updatedSeletecd="updatedSeletecd"
        :manifest="manifest"
        :use_custom_buttons="true"
        :regions="regions"
        :fit_id="fit_id"
        :show_all="true"
      ></OsdCustomViewer>
      -->
      <MoleculesOsd2
        v-if="targetIdMap"
        ref="ocv"
        :id="id"
        @updatedSeletecd="updatedSeletecd"
        :manifest="manifest"
        :use_custom_buttons="true"
        :regions="regions"
        :fit_id="fit_id"
        :show_all="true"
      ></MoleculesOsd2>
    </v-col>
  </v-row>
</template>
