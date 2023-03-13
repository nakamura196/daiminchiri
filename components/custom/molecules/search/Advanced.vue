<script setup lang="ts">
import { mdiMagnify, mdiOpenInNew } from "@mdi/js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const localePath = useLocalePath();

// const { formatArrayValue } = useUtils();

const target = ref("keyword");
const keyword = ref("");

for (let key in route.query) {
  if (key.includes("q-")) {
    const field = key.replace("q-", "");
    const value = formatArrayValue(route.query[key]);
    if (value.includes('"') && field === "label") {
      target.value = field + "_";
      keyword.value = value.replace(/\"/g, "");
    } else {
      target.value = field;
      keyword.value = value;
    }
  } else if (key == "keyword") {
    const value = formatArrayValue(route.query[key], " ");
    keyword.value = value;
  }
}

const eraOptions = ["古代・中世", "近世・維新"];
const era = ref(eraOptions);
const languageOptions = ["英語", "フランス語", "ドイツ語"];
const language = ref(languageOptions);

const trigger = (event: any) => {
  // 日本語入力中のEnterキー操作は無効にする
  if (event.keyCode !== 13) return;
  search();
};

const search = () => {
  const query = JSON.parse(JSON.stringify(route.query));

  delete query.keyword;

  if (keyword.value) {
    let field = target.value;
    field = field === "keyword" ? field : "q-" + field;

    const value = keyword.value;

    if (field == "q-label_") {
      field = "q-label";

      query[field] = `"${value}"`;
    } else {
      query[field] = value;
    }
  }

  if (language.value.length != languageOptions.length) {
    query["f-言語"] = language.value;
  }

  if (era.value.length != eraOptions.length) {
    query["f-時代"] = era.value;
  }

  if (Object.keys(query).length === 0) {
    alert(t("add_a_search_term"));
    return;
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
};

const md = 6;
const dialog = ref(false);
</script>
<template>
  <ClientOnly>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2">
        <v-text-field
          :label="$t($config.public.custom_search_label)"
          variant="outlined"
          @click:append="search"
          @keydown.enter="trigger"
          hide-details
          density="compact"
          v-model="keyword"
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="text-center my-5 mb-10">
      <v-btn flat color="primary" @click="search">
        <v-icon class="mr-1">{{ mdiMagnify }}</v-icon>
        {{ $t("search") }}</v-btn
      >

      <div class="mt-5">
        <nuxt-link
          variant="text"
          color="primary"
          :to="localePath({ name: 'page-slug', params: { slug: 'use' } })"
          >{{ $t("ご利用前に利用条件をお読み下さい") }}</nuxt-link
        >
        <!-- @click="dialog = true" -->
      </div>
    </div>

    <!--
    <v-alert type="warning" text="テスト中"></v-alert>
    -->

    <!-- 
    <v-row align="center" class="bg-sub">
      <v-col cols="12" sm="3"
        ><b>{{ $t("検索範囲") }}</b></v-col
      >
      <v-col cols="12" sm="9">
        <v-radio-group v-model="target" hide-details>
          <v-row dense>
            <v-col
              cols="12"
              :md="md"
              v-for="(item, key) in [
                {
                  label: $t('all'),
                  value: 'keyword',
                },
                {
                  label: $t('見出し（日本語）'),
                  value: 'label',
                },
                {
                  label: `${$t('見出し')}（${$t('完全一致')}）`,
                  value: 'label_',
                },
                {
                  label: `${$t('日本語読み')}（${$t('ひらがな')}）`,
                  value: '見出し読み',
                },
                {
                  label: `${$t('ローマ字')}（${$t('アルファベット')}）`,
                  value: 'ローマ字1',
                },
                {
                  label: $t('対訳語'),
                  value: '対訳語',
                },
                {
                  label: $t('説明文'),
                  value: '説明文',
                },
              ]"
              :key="key"
            >
              <v-radio :label="item.label" :value="item.value"></v-radio>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" sm="3"
        ><b>{{ $t("検索範囲") }}</b></v-col
      >
      <v-col cols="12" sm="9">
        <v-radio-group v-model="target">
          <v-row dense>
            <v-col
              cols="12"
              :md="md"
              v-for="(item, key) in [
                {
                  label: $t('all'),
                  value: 'keyword',
                },
                {
                  label: $t('見出し（日本語）'),
                  value: 'label',
                },
                {
                  label: `${$t('見出し')}（${$t('完全一致')}）`,
                  value: 'label_',
                },
                {
                  label: `${$t('日本語読み')}（${$t('ひらがな')}）`,
                  value: '見出し読み',
                },
                {
                  label: `${$t('ローマ字')}（${$t('アルファベット')}）`,
                  value: 'ローマ字1',
                },
                {
                  label: $t('対訳語'),
                  value: '対訳語',
                },
                {
                  label: $t('説明文'),
                  value: '説明文',
                },
              ]"
              :key="key"
            >
              <v-radio :label="item.label" :value="item.value"></v-radio>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>
    </v-row>

    -->

    <v-table class="my-5">
      <tbody>
        <tr>
          <th width="20%">{{ $t("検索範囲") }}</th>
          <td class="pt-4">
            <v-radio-group v-model="target">
              <!--  inline -->
              <v-row dense>
                <v-col
                  cols="12"
                  :md="md"
                  v-for="(item, key) in [
                    {
                      label: $t('all'),
                      value: 'keyword',
                    },
                    {
                      label: $t('見出し（日本語）'),
                      value: 'label',
                    },
                    {
                      label: `${$t('見出し')}（${$t('完全一致')}）`,
                      value: 'label_',
                    },
                    {
                      label: `${$t('日本語読み')}（${$t('ひらがな')}）`,
                      value: '見出し読み',
                    },
                    {
                      label: `${$t('ローマ字')}（${$t('アルファベット')}）`,
                      value: 'ローマ字1',
                    },
                    {
                      label: $t('対訳語'),
                      value: '対訳語',
                    },
                    {
                      label: $t('説明文'),
                      value: '説明文',
                    },
                  ]"
                  :key="key"
                >
                  <v-radio :label="item.label" :value="item.value"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </td>
        </tr>
        <tr>
          <th width="20%">{{ $t("時代") }}</th>
          <td>
            <!--  inline -->
            <v-row dense>
              <v-col
                cols="12"
                :md="md"
                :key="key"
                v-for="(item, key) in [
                  {
                    label: $t('古代・中世'),
                    value: '古代・中世',
                  },
                  {
                    label: $t('近世・維新'),
                    value: '近世・維新',
                  },
                ]"
              >
                <v-checkbox
                  v-model="era"
                  :label="item.label"
                  :value="item.value"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </td>
        </tr>
        <tr>
          <th width="20%">{{ $t("言語") }}</th>
          <td>
            <v-row dense>
              <v-col
                cols="12"
                :md="md"
                :key="key"
                v-for="(item, key) in [
                  {
                    label: $t('英語'),
                    value: '英語',
                  },
                  {
                    label: $t('フランス語'),
                    value: 'フランス語',
                  },
                  {
                    label: $t('ドイツ語'),
                    value: 'ドイツ語',
                  },
                ]"
              >
                <v-checkbox
                  v-model="language"
                  :label="item.label"
                  :value="item.value"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="bg-sub text-center">
          <span>{{ $t("注意事項") }}</span>
        </v-card-title>
        <div>
          <v-list>
            <v-list-item>
              日本史用語翻訳グロッサリー・データベースに収録した用語は、著作権者より使用の許可を得たものです。
            </v-list-item>
            <v-list-item>
              本データベースの利用規定は、<a
                href="https://www.hi.u-tokyo.ac.jp/faq/kitei/"
                target="_blank"
                >東京大学史料編纂所公開用データベース利用規定
                <v-icon size="small" class="mb-1">{{ mdiOpenInNew }}</v-icon></a
              >に準じます。
            </v-list-item>
          </v-list>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            {{ $t("close") }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ClientOnly>
</template>
<style>
.v-table__wrapper {
  overflow-y: hidden !important;
}
</style>