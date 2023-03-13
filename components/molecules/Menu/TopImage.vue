<template>
  <div
    :style="`background-image: url('${$config.public.appUrl + $config.top_image_url}');`"
  >
    <div style="background-color: rgba(0, 0, 0, 0.5)" class="py-10">
      <v-container>
        <h1 class="text-center">
          <b style="color: white">{{ $t($config.title) }}</b>
        </h1>
      </v-container>
    </div>
  </div>
</template>
