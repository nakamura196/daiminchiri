interface CachedData {
  [key: string]: any;
}

// const fs = require("fs");
import fs from "fs";
const cachedData: CachedData = {};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", async (vueApp) => {
    if (!cachedData["foo-bar"]) {
      /*
      const url =
        "https://script.googleusercontent.com/macros/echo?user_content_key=B3e_Jwggvq_JnHnzOJx4eNi0BXqIDIWLNXENISzDXCILOntB-H9giscPbsdW0I4_2Qte-i1P8i4zLe7Px2fyhoNvwxBO8dWym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNvxK5_7i8X-9gYIiBJjEVKb_Fn2yrpS9i2e3zhLZTag8qD2e12tf_dqw_aVHQrETEiBaahaUXHAyIz862xTA4R8aAe98peq5g&lib=MPGMdlPkQXyqlDxU4oG4MB9wwPj3UkOcQ";
      const res = await fetch(url);
      const data = await res.json();
      */
      const data = JSON.parse(
        fs.readFileSync("./public/data/index.json", "utf8")
      );

      cachedData["foo-bar"] = data; // data[0];

      /*
      cachedData["foo-bar"].items.forEach((item: any) => {
        cachedData[item.id] = item;
      });
      */
      cachedData["foo-bar"].forEach(
        (item: any) => (cachedData[item._id] = item)
      );

      /*
      cachedData["foo-bar"].forEach(
        (item: any) => (vueApp.$nuxt.payload.data[item._id] = item)
      )
      */
    }

    let url = String(vueApp.$nuxt.ssrContext?.url);
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    const spl = url.split("/");
    const slug = spl[spl.length - 1];
    
    if (cachedData[slug]) {
      vueApp.$nuxt.payload.data[slug] = cachedData[slug];
    }
  });
});
