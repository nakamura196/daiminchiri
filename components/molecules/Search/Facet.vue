<script setup lang="ts">
import {
  mdiCheckboxMarked,
  mdiCheckboxBlankOutline,
  mdiCloseCircleOutline,
  mdiMinusBox,
} from "@mdi/js";
import { getTypedValues } from "~/utils/search";

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

const publicRuntimeConfig = useRuntimeConfig().public;
const t_all = publicRuntimeConfig.t.all;

//

const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const isOpen = ref(0);
let isShowAll = ref(false);

const emits = defineEmits<{ (e: string): void }>();

const refine = (selectedValues: any) => {
  if (typeof selectedValues === "string") {
    selectedValues = [selectedValues];
  }

  const field = props.id;
  const query = JSON.parse(JSON.stringify(route.query));

  let values = [];

  //

  //追加
  let currentValues = query["f-" + field];

  //クエリが存在すれば
  if (currentValues) {
    if (typeof currentValues === "string") {
      currentValues = [currentValues];
    }

    for (const value of currentValues) {
      if (selectedValues.length !== 0) {
        values.push(value);
      }
    }
  }

  if (selectedValues.length !== 0) {
    for (const value of selectedValues) {
      if (values.includes(value)) {
        values = values.filter((n: string) => n !== value);
      } else {
        values.push(value);
      }
    }
  }

  query["f-" + field] = values;

  ////////////

  //ページを先頭に
  query["page"] = 1;

  router.push(
    localePath({
      name: "resource",
      params: {
        resource: "item",
      },
      query,
    })
  );

  emits("close");
};

const isChecked = (value: string): boolean => {
  const query = route.query;

  const field = props.id;

  let values = [];

  let currentValues: any = query["f-" + field];

  if (!currentValues) {
    return false;
  }

  if (typeof currentValues === "string") {
    currentValues = [currentValues];
  }
  values = currentValues;

  if (values.includes(value)) {
    return true;
  } else {
    return false;
  }
};

const formatQueryValue = (text: string) => {
  if (text.startsWith("-")) {
    return text.slice(1);
  }
  return text;
};

const close = () => {
  isShowAll.value = false
  emits("close");
};
</script>
<template>
  <div>
    <v-expansion-panels v-model="isOpen" class="mb-4">
      <v-expansion-panel elevation="0">
        <v-expansion-panel-title color="sub"
          ><div>
            {{ $t(label) }}
            <small
              >{{ buckets.length.toLocaleString()
              }}<template v-if="false">+</template></small
            >
          </div></v-expansion-panel-title
        >
        <v-expansion-panel-text>
          <v-table density="compact">
            <tbody>
              <tr v-for="(e, key) in buckets.slice(0, 5)">
                <td class="clickable" @click="refine(e.key)">
                  <template v-if="isChecked(e.key)">
                    <v-icon color="primary">{{ mdiCheckboxMarked }}</v-icon>
                  </template>
                  <template v-else>
                    <v-icon>{{ mdiCheckboxBlankOutline }}</v-icon>
                  </template>
                </td>
                <td width="60%" class="py-1 clickable" @click="refine(e.key)">
                  {{ t_all ? $t(e.key) : e.key }}
                </td>
                <td @click="refine(e.key)" class="clickable text-right">
                  {{ e.doc_count }}
                </td>
                <td class="text-right">
                  <v-btn
                    @click="refine('-' + e.key)"
                    icon
                    size="x-small"
                    variant="text"
                    :disabled="isChecked(e.key)"
                    ><v-icon>{{ mdiCloseCircleOutline }}</v-icon></v-btn
                  >
                </td>
              </tr>

              <!-- 否定語 -->
              <template
                v-for="(e, key) in getTypedValues(route.query, id, 'minus')"
              >
                <tr @click="refine(e)" class="clickable">
                  <td>
                    <v-icon color="red-darken-1">{{ mdiMinusBox }}</v-icon>
                  </td>
                  <td width="60%">{{ formatQueryValue(e) }}</td>
                  <td></td>
                  <td></td>
                </tr>
              </template>
            </tbody>
          </v-table>

          <div class="text-right mt-2">

            <v-btn
              color="primary"
              small
              variant="text"
              @click="/*showAll*/ isShowAll = true"
              >{{ $t("show_all") }}</v-btn
            >
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-dialog v-model="isShowAll">
      <MoleculesSearchFacetDialog
        @close="isShowAll = false"
        @refined="close()"
        :id="id"
        :label="label"
        :buckets="buckets"
      ></MoleculesSearchFacetDialog>
    </v-dialog>
  </div>
</template>
