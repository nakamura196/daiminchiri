<script setup lang="ts">
// @types/chart.jsの型付けを使用するためにimportしてます。
import type { ChartData, ChartOptions } from 'chart.js';

interface PropType {
  data: ChartData | null;
}

const props = withDefaults(defineProps<PropType>(), {
  data: () => null,
});

// それぞれの部品をインポートしていきます。
// まだ種類があると思いますが、とりあえず手当たり次第importしておきます。
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Filler,
  LineElement
} from 'chart.js'

// 今回はRadar-chartを作成するので、import。
// 他にも{ Bar }など、種類があります。
import { Radar, Bar, Doughnut } from 'vue-chartjs'

// ここでChartJSでこれらを使います〜と登録してあげます。
ChartJS.register(CategoryScale, LinearScale, BarElement,PointElement ,RadialLinearScale, LineElement, Filler, Title, Tooltip, Legend)

// ここではchartに使うdataを登録していきます。
// ChartData<'radar'>でRadar-Chartの型付けを使ってます。
// 他にも<"bar">などがあります。


// ここではchartに使うoptionsを登録していきます。
// ChartOptions<'radar'>でRadar-Chartの型付けを使ってます。
// 他にも<"bar">などがあります。
const options:ChartOptions<'bar'> = {
  responsive: true,
  // responsive: false,
  maintainAspectRatio: false
};
</script>

<template>
    <!-- 定義したdataとoptionsを渡してあげます。 -->
    <Bar class="pa-4" :data="data" :options="options" v-if="data"/>

  <!--
  <Doughnut :data="data" :options="options"/> -->
</template>