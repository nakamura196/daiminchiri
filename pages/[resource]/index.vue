<script setup lang="ts">
import { useDisplay } from "vuetify";
import { mdiFilterVariant, mdiMagnify, mdiMenu } from "@mdi/js";
import { $search } from "~/utils/search";

const { t } = useI18n();

definePageMeta({
  layout: "search",
});

// 変数

const barHeight = 48;

const localePath = useLocalePath();

const total = ref(0);
const hits = ref([]);
const aggregations = ref<any>({});

const height = ref(0);

const isFacetOpen = ref(true);
const isNarrowOpen = ref(false);

const display = useDisplay();

const loading = ref(true);

const { $config } = useNuxtApp();

const defaultPage = 1;
const defaultSize = $config.default.defaultPerPage;
const defaultSort = $config.default.defaultSort;
const defaultLayout = $config.default.defaultLayout;

const itemsPerPage = $config.default.perPageItems;

const aggregationConfig = $config.default.aggregations;

const itemsSort: any[] = [];

const sorts = $config.default.sorts;
for (const option of sorts) {
  const key = option.key;
  for (const sortValue of ["asc", "desc"]) {
    if (sortValue === "asc" && key === "_score") {
      continue;
    }
    itemsSort.push({
      title: t(option.label) + " " + t(sortValue),
      value: key + ":" + sortValue,
    });
  }
}

const layouts_ = $config.default.layouts;
const itemsLayout: any[] = [];
for (const option of layouts_) {
  itemsLayout.push({
    title: t(option.title),
    value: option.value,
  });
}

const routeQuery: any = computed(() => {
  return useRoute().query;
});

const routeQueryValue = routeQuery.value;

// const keyword = ref(routeQuery.keyword || "");
const page = ref(
  routeQueryValue.page ? parseInt(routeQueryValue.page) : defaultPage
);
const perPage = ref(
  routeQueryValue.size ? parseInt(routeQueryValue.size) : defaultSize
);
const sort = ref(routeQueryValue.sort || defaultSort);

const layout_ = ref(routeQueryValue.layout || defaultLayout);

const length = ref(0);

const search = async () => {
  const target = document.getElementById("main");
  if (target) {
    target.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }

  const results = await $search(routeQuery.value, "fuse");

  total.value = results.hits.total.value;

  hits.value = results.hits.hits;

  aggregations.value = results.aggregations;

  length.value = Math.ceil(total.value / perPage.value);

  loading.value = false;
};

onMounted(() => {
  height.value = window.innerHeight;
  search();
});

watch(routeQuery, () => {
  // pageだけ特別な処理
  if (routeQuery.value.page) {
    page.value = parseInt(routeQuery.value.page);
  }
  search();
});

const move = (query: any) => {
  const path: any = {
    name: "resource",
    params: useRoute().params,
    query,
  };

  useRouter().push(localePath(path));
};

watch(perPage, () => {
  const query = JSON.parse(JSON.stringify(routeQuery.value));

  // page.value = 1
  query.page = 1; // page.value;
  query.size = perPage.value;

  move(query);
});

watch(layout_, () => {
  const query = JSON.parse(JSON.stringify(routeQuery.value));

  query.layout = layout_.value;

  move(query);
});

watch(page, () => {
  const query = JSON.parse(JSON.stringify(routeQuery.value));

  query.page = page.value;

  move(query);
});

watch(sort, () => {
  const query = JSON.parse(JSON.stringify(routeQuery.value));

  // page.value = 1

  query.page = 1; // page.value
  query.sort = sort.value;

  move(query);
});

const route = useRoute();
const resource = String(route.params.resource);
const $t = useI18n().t;
const runtimeConfig = useRuntimeConfig();
const appUrl = runtimeConfig.public.appUrl;
const title = $t(resource);

useJsonld([
  {
    itemListElement: [
      {
        position: 1,
        name: $t("top"),
        item: appUrl,
        "@type": "ListItem",
      },
      {
        position: 2,
        name: title,
        item: `${appUrl}/${route.params.resource}`,
        "@type": "ListItem",
      },
    ],
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
  },
]);

useHead({
  titleTemplate: `${title} - %s`,
  meta: [{ property: "og:title", content: `${title} - %s` }],
});

const hidePagination = computed(() => {
  return ["map"].includes(layout_.value);
});
</script>
<template>
  <ClientOnly>
    <template v-if="loading">
      <!-- loading -->
      <div class="text-center pa-10">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <p class="mt-5">
          {{ $t("initial_loading") }}
        </p>
      </div>
    </template>
    <template v-else>
      <!--  v-else -->

      <template v-if="display.smAndDown.value">
        <v-container class="pa-4">
          <MoleculesSearchFullTextSearch
            class="mb-4"
            :label="$config.public.custom_search_label"
          ></MoleculesSearchFullTextSearch>

          <!-- フィルタ -->
          <MoleculesSearchFilter></MoleculesSearchFilter>
          <div class="mt-4">
            <MoleculesSearchTotal :value="total"></MoleculesSearchTotal>
          </div>

          <template v-if="!hidePagination">
            <MoleculesSearchPagination
              class="mt-4"
              v-model="page"
              :length="length"
            />

            <MoleculesSearchPerPage
              class="mt-4"
              :items="itemsPerPage"
              v-model="perPage"
            ></MoleculesSearchPerPage>

            <MoleculesSearchSelect
              class="mt-4"
              v-model="sort"
              :label="$t('sort_by')"
              :items="itemsSort"
            />
          </template>

          <MoleculesSearchSelect
            class="mt-4"
            v-model="layout_"
            :label="$t('layout')"
            :items="itemsLayout"
          />
        </v-container>

        <v-sheet color="sub" v-if="!hidePagination">
          <div class="text-center py-2">
            <v-btn variant="flat" color="primary" @click="isNarrowOpen = true"
              ><v-icon class="mr-1">{{ mdiFilterVariant }}</v-icon>
              {{ $t("narrow_down") }}</v-btn
            >
          </div>
        </v-sheet>

        <v-container>
          <!-- 関連項目
          <HigMoleculesSearchRelated
            v-if="aggregations.related"
            :keyword="routeQuery.keyword"
            :buckets="aggregations.related.buckets"
            class="mb-5"
          ></HigMoleculesSearchRelated>
          -->

          <!-- 結果一覧 -->
          <MoleculesSearchResult
            :layout="layout_"
            :items="hits"
          ></MoleculesSearchResult>

          <!-- 頁ネーション -->
          <div class="text-center pt-5 my-5" v-if="!hidePagination">
            <v-pagination
              size="small"
              v-model="page"
              :length="length"
              :total-visible="3"
            ></v-pagination>
          </div>
        </v-container>

        <LayoutsFooter />

        <MoleculesMenuToTopBtn3 />
      </template>
      <template v-else>
        <v-row class="pa-0 ma-0">
          <v-col
            v-if="isFacetOpen"
            :cols="$config.colSearch"
            :style="'height: ' + (height - barHeight) + 'px'"
            class="overflow-y-auto pa-4"
          >
            <MoleculesSearchFacets
              :aggregation-config="aggregationConfig"
              :aggregations="aggregations"
            ></MoleculesSearchFacets>
          </v-col>
          <v-col
            v-if="/*isFacetOpen*/ true"
            :cols="isFacetOpen ? 12 - $config.colSearch : 12"
            :style="'height: ' + (height - barHeight) + 'px'"
            class="overflow-y-auto pa-0"
            id="main"
          >
            <div class="pa-4">
              <MoleculesSearchFullTextSearch
                :label="$config.public.custom_search_label"
              ></MoleculesSearchFullTextSearch>

              <!-- フィルタ -->
              <MoleculesSearchFilter class="mt-4"></MoleculesSearchFilter>

              <!-- おぷしょん　-->
              <v-row dense align="center" class="mt-4 mb-4">
                <v-col cols="12" sm="3">
                  <v-tooltip
                    location="bottom"
                    :text="isFacetOpen ? $t('close_facets') : $t('open_facets')"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        size="x-small"
                        :icon="mdiMenu"
                        class="mr-2 mb-1"
                        v-bind="props"
                        variant="flat"
                        :color="isFacetOpen ? 'primary' : 'sub'"
                        @click="isFacetOpen = !isFacetOpen"
                      >
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <MoleculesSearchTotal :value="total"></MoleculesSearchTotal>
                </v-col>
                <template v-if="!hidePagination || true">
                  <v-col cols="12" sm="3">
                    <MoleculesSearchPagination v-if="!hidePagination"
                      v-model="page"
                      :length="length"
                    />
                  </v-col>
                  <v-col cols="6" sm="2">
                    <!-- <SearchPerPage /> -->
                    <MoleculesSearchPerPage v-if="!hidePagination"
                      :items="itemsPerPage"
                      v-model="perPage"
                    ></MoleculesSearchPerPage>
                  </v-col>
                  <v-col cols="6" sm="2">
                    <MoleculesSearchSelect v-if="!hidePagination"
                      v-model="sort"
                      :label="$t('sort_by')"
                      :items="itemsSort"
                    />
                  </v-col>
                </template>
                <v-col cols="6" md="2">
                  <MoleculesSearchSelect
                    v-model="layout_"
                    :label="$t('layout')"
                    :items="itemsLayout"
                  />
                </v-col>
              </v-row>

              <!-- 結果一覧 -->
              <MoleculesSearchResult
                :layout="layout_"
                :items="hits"
              ></MoleculesSearchResult>

              <!-- 頁ネーション -->
              <div class="text-center pt-5 my-5" v-if="!hidePagination">
                <v-pagination
                  size="small"
                  v-model="page"
                  :length="length"
                  :total-visible="3"
                ></v-pagination>
              </div>
            </div>

            <!-- Footer -->
            <LayoutsFooter />

            <MoleculesMenuToTopBtn2 id="main" />
          </v-col>
        </v-row>
      </template>
    </template>

    <!-- dialog -->
    <v-dialog v-model="isNarrowOpen" scrollable>
      <v-card>
        <v-card-title class="bg-sub">{{ $t("narrow_down") }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 500px">
          <MoleculesSearchFacets
            @close="isNarrowOpen = false"
            :aggregation-config="aggregationConfig"
            :aggregations="aggregations"
          ></MoleculesSearchFacets>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" color="primary" @click="isNarrowOpen = false">{{
            $t("close")
          }}</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ClientOnly>
</template>
