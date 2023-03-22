<script setup lang="ts">
const slug = useRoute().params.slug;
const { locale } = useI18n();

const { t } = useI18n();

const item = await queryContent(`/${locale.value}/page/` + "dataset").findOne();

const localePath = useLocalePath();

const bh = [
  {
    title: t("top"),
    disabled: false,
    to: localePath({ name: "index" }),
  },
  {
    title: item.title,
    disabled: false,
  },
];
</script>
<template>
  <LayoutsCommon :title="item.title" :items="bh">
    <h1>{{ $t(item.title) }}</h1>

    <v-table>
      <thead>
        <tr>
          <td>{{ $t("name") }}</td>
          <td>{{ $t("description") }}</td>
          <td>{{ $t("format") }}</td>
          <td>{{ $t("download") }}</td>
          <td>{{ $t("viewer") }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in item.body">
          <td width="20%">
            {{ row.label }}
          </td>
          <td width="20%">
            {{ row.description }}
          </td>
          <td width="20%">
            {{ row.extent }}
          </td>
          <td width="20%">
            <a :href="row.download">
              {{ row.download }}
            </a>
          </td>
          <td width="20%">
            <a :href="row.viewer">
              {{ row.viewer }}
            </a>
          </td>
        </tr>
      </tbody>
    </v-table>
  </LayoutsCommon>
</template>
