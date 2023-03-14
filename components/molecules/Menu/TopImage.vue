<script setup lang="ts">
const localePath = useLocalePath();
const publicRuntimeConfig = useRuntimeConfig().public;
const top_link = publicRuntimeConfig.top_link;
</script>
<template>
  <div
    :style="`background-image: url('${$config.public.appUrl + $config.top_image_url}');`"
  >
    <div style="background-color: rgba(0, 0, 0, 0.5)" class="py-10">
      <v-container class="text-center">
        <h1>
          <b style="color: white">{{ $t($config.title) }}</b>
        </h1>

        <v-btn v-if="top_link" color="error" :to="localePath(top_link)">{{ $t("try_out") }}</v-btn>
      </v-container>
    </div>
  </div>
</template>
