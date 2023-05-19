<script setup lang="ts">
import type { ChartData, ChartOptions } from "chart.js";

enum ChartType {
  bar,
  pie,
}

interface Item {
  // items: Item[];

  key: string;
  doc_count: number;
  
}

interface PropType {
  items: Item[];
  type?: ChartType;
  height: number;
}

const props = withDefaults(defineProps<PropType>(), {
  items: () => [],
  type: () => ChartType.bar,
  height: 400
});

const labels = computed(() => {
  return props.items.map((item) => item.key);
});

const values = computed(() => {
  return props.items.map((item) => item.doc_count);
});

// <"bar" | "pie">

const data = computed(() => {
  const data: ChartData = {
    labels:
      /*[
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ]*/ labels.value,
    datasets: [
      {
        label: "", // 'My First dataset',
        // backgroundColor: 'rgba(179,181,198,0.2)',
        // borderColor: 'rgba(179,181,198,1)',
        // pointBackgroundColor: 'rgba(179,181,198,1)',
        // pointBorderColor: '#fff',
        // pointHoverBackgroundColor: '#fff',
        // pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: values.value, // [65, 59, 90, 81, 56, 55, 40]
      },
      /*
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100]
    }
    */
    ],
  };
  return data;
});
</script>
<template>
  <div>
    <div :style="`height: ${height}px`">
      <template v-if="props.type === ChartType.pie">
        <MoleculesVisPie :data="data"></MoleculesVisPie>
      </template>
      <template v-else>
        <MoleculesVisBar :data="data"></MoleculesVisBar>
      </template>
    </div>
  </div>
</template>
