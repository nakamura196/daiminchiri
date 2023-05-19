<script setup lang="ts">
import {
  mdiCheckboxMarked,
  mdiCheckboxBlankOutline,
  mdiCloseCircle,
  mdiMagnify,
} from "@mdi/js";
import { $search, truncate, getTypedValues } from "~/utils/search";

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

interface PropType {
  buckets: any[];
  label: string;
  id: string;
}

const props = withDefaults(defineProps<PropType>(), {
  buckets: () => [],
  label: () => "",
  id: () => "",
});

const { t } = useI18n();

const pluses = ref<string[]>([]);
const minuses = ref<string[]>([]);

const query = route.query;
const field = props.id;

const aggregationAll = ref([]);

const agg: any = props.buckets;
aggregationAll.value = JSON.parse(JSON.stringify(agg));

const plusValues = getTypedValues(query, props.id, "plus"); // this.
const minusValues = getTypedValues(query, props.id, "minus"); // this.

const minusValuesWithoutPrefix = [];
for (const m of minusValues) {
  minusValuesWithoutPrefix.push(m.substring(1));
}

pluses.value = plusValues;
minuses.value = minusValuesWithoutPrefix;

const queryAll = JSON.parse(JSON.stringify(route.query));
delete queryAll["f-" + field];

const results = await $search(queryAll, "fuse");

const res = results.aggregations[field];

aggregationAll.value = res.buckets;

const emits = defineEmits<{ (e: string): void }>();

const close = () => {
  emits("close");
};

const refineAll = () => {
  const query = JSON.parse(JSON.stringify(route.query));

  const field = props.id;

  delete query["f-" + field];

  const array = [];

  for (const value of pluses.value) {
    array.push(value);
  }

  for (const value of minuses.value) {
    array.push("-" + value);
  }

  if (array.length > 0) {
    query["f-" + field] = array;
  }

  router.push(
    localePath({
      name: "resource",
      params: {
        resource: "item",
      },
      query,
    })
  );

  emits("refined");
};

const itemsPerPage = ref(50);
const headers = ref([
  {
    title: t("include"),
    sortable: false,
    key: "include",
  },
  {
    title: t("exclude"),
    sortable: false,
    key: "exclude",
  },
  {
    title: t("name"),
    sortable: false,
    key: "key",
  },
  {
    title: t("results"),
    sortable: false,
    key: "doc_count",
  },
]);

const search = ref("");

const update = (key: string, value: string) => {
  let array = pluses.value;
  let array2 = minuses.value;
  if (key !== "plus") {
    array = minuses.value;
    array2 = pluses.value;
  }
  if (array.includes(value)) {
    array.splice(array.indexOf(value), 1);
  } else {
    array.push(value);
    if (array2.includes(value)) {
      array2.splice(array2.indexOf(value), 1);
    }
  }
};

const tableHeight = window.innerHeight * 0.6;
const height = window.innerHeight * 0.7;

const tab = ref("table");

enum ChartType {
  bar,
  pie,
}
</script>
<template>
  <v-card>
    <v-card-title class="bg-sub">
      <span>{{ $t(label) }}</span>
    </v-card-title>
    <v-card-text>
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab value="table">{{ $t("table") }}</v-tab>
        <v-tab value="bar">{{ $t("bar") }}</v-tab>
        <v-tab value="pie">{{ $t("pie") }}</v-tab>
      </v-tabs>

      <v-window v-model="tab" class="mt-4">
        <v-window-item :key="'table'" :value="'table'">
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

          <div :class="pluses.length > 0 || minuses.length > 0 ? 'mb-4' : ''">
            <template v-for="(array, key2) in [pluses, minuses]">
              <v-chip
                class="mr-2 my-1"
                :class="key2 == 1 ? 'bg-red-darken-1' : 'bg-primary'"
                closable
                @click:close="update(key2 == 1 ? 'minus' : 'plus', e)"
                v-for="(e, key3) in array"
                :key="`${key2}-${key3}`"
              >
                {{ truncate(e) }}
              </v-chip>
            </template>
          </div>

          <div :style="`height: ${tableHeight}px; overflow-y: auto`">
            <v-data-table
              :search="search"
              density="compact"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items="aggregationAll"
              item-value="name"
            >
              <template v-slot:item.include="{ item }">
                <span class="clickable" @click="update('plus', item.raw.key)">
                  <template v-if="pluses.includes(item.raw.key)">
                    <v-icon color="primary">{{ mdiCheckboxMarked }}</v-icon>
                  </template>
                  <template v-else>
                    <v-icon>{{ mdiCheckboxBlankOutline }}</v-icon>
                  </template>
                </span>
              </template>

              <template v-slot:item.exclude="{ item }">
                <span class="clickable" @click="update('minus', item.raw.key)">
                  <template v-if="minuses.includes(item.raw.key)">
                    <v-icon color="red-darken-1">{{
                      mdiCheckboxMarked
                    }}</v-icon>
                  </template>
                  <template v-else>
                    <v-icon>{{ mdiCheckboxBlankOutline }}</v-icon>
                  </template>
                </span>
              </template>

              <template v-slot:item.doc_count="{ item }">
                {{ item.raw.doc_count.toLocaleString() }}
              </template>
            </v-data-table>
          </div>
        </v-window-item>

        <v-window-item :key="'bar'" :value="'bar'">
          <MoleculesSearchFacetGraph :height="height" :items="aggregationAll"></MoleculesSearchFacetGraph>
        </v-window-item>

        <v-window-item :key="'pie'" :value="'pie'">
          <MoleculesSearchFacetGraph :height="height" :items="aggregationAll" :type="ChartType.pie"></MoleculesSearchFacetGraph>
        </v-window-item>
      </v-window>
    </v-card-text>
    <v-row class="pa-0 ma-0">
      <v-col>
        <v-btn block color="primary" flat variant="text" @click="close()">
          {{ $t("cancel") }}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block color="primary" flat @click="refineAll()">
          {{ $t("update") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
