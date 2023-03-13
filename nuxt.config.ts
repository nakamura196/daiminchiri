// https://v3.nuxtjs.org/api/configuration/nuxt.config
const fs = require("fs");
import { $rs } from "./utils/resourcesync.js";

const environment = process.env.APP_MODE;

const type = "fuse";

const routes: string[] = [];

if (type === "fuse") {
  routes.push(`/item/`);
  routes.push(`/en/item/`);

  if (environment === "production") {
    // const index_path = "./server/data/index.json";
    const index_path = "./public/data/ids.json";
    let rawdata_ = fs.readFileSync(index_path);
    const rawdata: any[] = JSON.parse(rawdata_);

    const ids = rawdata; // .slice(0,20)

    /*
    const ids = [];
    for (const item of rawdata) {
      // ids.push(item._id);
      ids.push(item)
    }
    */

    // resourcesync
    const test = $rs(ids);
    for (const path of test) {
      routes.push(path);
    }

    for (const id of ids) {
      routes.push(`/item/${id}`);
      routes.push(`/en/item/${id}`);
    }
  }
}

import config_ from "./extra.js";

// 重要
const config: any = config_;

const title = config.title; // env.title;

const conf_env = config.env;

const getEnvConfig = (conf_env: any) => {
  switch (environment) {
    case "production":
      return conf_env.prod; //process.env.baseUrl_prod;
    case "staging":
      return conf_env.stg; // process.env.baseUrl_stg;
    default:
      return conf_env.dev; // process.env.baseUrl;
  }
};

// 環境に応じて変更
const conf_env_value = getEnvConfig(conf_env);
// const baseUrl = getBaseUrl();

const hostname = conf_env_value.hostname;
const baseUrl = conf_env_value.baseUrl;

config.hostname = hostname;
config.baseUrl = baseUrl;

//フルパス
const appUrl = hostname + baseUrl;
config.appUrl = appUrl;

const lang = "ja";
const description = config.description;
const keywords = config.keywords;
const image = appUrl + config.image;
const favicon = appUrl + "/favicon.ico";

const modeKey = environment === "production" ? "server" : "client";
const mode = {
  server: {
    ssr: true,
    preset: undefined,
  },
  client: {
    ssr: false,
    preset: "service-worker",
  },
};

config.mode = modeKey;

export default defineNuxtConfig({
  /*
  sourcemap: false,
  experimental: {
    payloadExtraction: false,
  },
  */
  ssr: mode[modeKey].ssr,
  modules: [
    "@nuxt/content",
    "@nuxtjs/i18n",
    "nuxt-simple-sitemap",
    "nuxt-jsonld",
  ],
  sitemap: {
    hostname,
    exclude: ["/item/**", "/en/item/**"],
  },
  runtimeConfig: {
    public: config, // publicRuntimeConfig
  },
  css: [
    // "vuetify/lib/styles/main.sass",
    "@/assets/styles/test.css",
    "@/assets/styles/main.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    preset: mode[modeKey].preset,
  },
  app: {
    baseURL: baseUrl, // : app_baseUrl,
    head: {
      htmlAttrs: {
        lang,
      },
      title,
      meta: [
        { charset: "utf-8" },
        { "http-equiv": "x-ua-compatible", content: "ie=edge" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "format-detection",
          content: "telephone=no, email=no, address=no",
        },
        // SEO関連
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        // ogp関連
        {
          property: "og:site_name",
          content: title,
        },
        { property: "og:type", content: "website" },
        { property: "og:Url", content: appUrl },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:image",
          content: image,
        },
        {
          property: "og:locale",
          content: "ja_JP",
        },
        { name: "twitter:card", content: "summary" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      ],
    },
  },
  i18n: {
    locales: [
      { code: "ja", iso: "ja_JP", file: "ja.js" },
      { code: "en", iso: "en-US", file: "en.js" },
    ],
    langDir: "locales/",
    defaultLocale: lang,

    //strategy: "no_prefix",

    lazy: true,
    /*
    vueI18n: {
      fallbackLocale: lang,
    },
    */
  },
  generate: {
    routes,
  },
});
