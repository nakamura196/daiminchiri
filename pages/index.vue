<template>
  <div>
    <MoleculesMenuTopImage></MoleculesMenuTopImage>

    <v-container>
      option
      <!-- <CustomMoleculesMenu></CustomMoleculesMenu> -->
    </v-container>

    <div class="bg-sub">
      <v-container class="pa-10">
        <p class="mb-5">
          <b>お知らせ</b>
          <span class="ml-5"
            ><nuxt-link :to="localePath({ name: 'news' })"
              ><small>すべて</small></nuxt-link
            ></span
          >
        </p>

        <MoleculesNewsList></MoleculesNewsList>
      </v-container>
    </div>
  </div>
</template>
