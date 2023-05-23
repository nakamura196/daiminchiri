<script setup lang="ts">

const d = await queryContent(`/data/dict`).findOne();
const data = d.data


const { t } = useI18n();


const localePath = useLocalePath();

const title = data.name

const bh = [
  {
    title: t("top"),
    disabled: false,
    to: localePath({ name: "index" })
  },
  {
    title: t(title),
    disabled: false,
  },
];


useHead({
  titleTemplate: `${title} - %s`,
  meta: [
    { property: "og:title", content: `${title} - %s` },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(data)
        }
    ]
});

</script>
<template>
  <LayoutsCommon :title="title" :items="bh">
    <h1>{{ $t(title) }}</h1>

    <v-table>
      <tbody>
        <tr>
          <td>
            辞書識別子
          </td>
          <td>
            {{ data.identifier[0] }}
          </td>
        </tr>

        <tr>
          <td>
            辞書名
          </td>
          <td>
            {{ data.name }}
          </td>
        </tr>

        <tr>
          <td>
            説明
          </td>
          <td>
            {{ data.description }}
          </td>
        </tr>

        <tr>
          <td>
            件数
          </td>
          <td>
            {{ data.size.toLocaleString() }}
          </td>
        </tr>

        <tr>
          <td>
            作成者
          </td>
          <td>
            <a :href="data.creator[0].sameAs">{{ data.creator[0].name }}</a>
          </td>
        </tr>

        <tr>
          <td>
            ライセンス
          </td>
          <td>
            <a :href="data.license">{{ data.license }}</a>
          </td>
        </tr>

        <tr>
          <td>
            出典
          </td>
          <td>
            <a :href="data.isBasedOn.url">{{ data.isBasedOn.name }}</a>
          </td>
        </tr>

        <tr>
          <td>
            辞書CSVファイル
          </td>
          <td>
            <a :href="data.distribution[0].contentUrl">{{ "CSVダウンロード" }}</a>
          </td>
        </tr>

        <tr>
          <td>
            時間範囲
          </td>
          <td>
            {{ data.temporalCoverage }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <MoleculesMapDictionaryMap class="mt-10" :box="data.spatialCoverage.geo.box" style="height: 500px"></MoleculesMapDictionaryMap>
  </LayoutsCommon>
</template>
