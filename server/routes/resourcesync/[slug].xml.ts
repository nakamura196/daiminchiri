export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const hostname = runtimeConfig.public.appUrl

    const slug = event.context.params["slug.xml"];

    const id = slug.replace("resourcelist-", "").replace(".xml", "");
    const start_index = Number(id)

    const size = 50000

    const items_: any = await import(`../../../public/data/ids.json`);

    const items = items_.default;

    const filteredItems = items.slice(start_index, start_index + size)

    const urls = []

    const start = new Date().toISOString();

    const id_field = "_id"

    for (const item of filteredItems) {
      const item_id = item // item[id_field]
      urls.push(
        `<url><loc>${hostname}/item/${item_id}</loc><lastmod>${start}</lastmod></url>`
      );
    }

    const end = new Date().toISOString();
  
    const sitemapString = `<?xml version="1.0" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:rs="http://www.openarchives.org/rs/terms/">
      <rs:md at="${start}" capability="resourcelist" completed="${end}"/>
      ${urls.join("\n")}
      </urlset>`;
  
      event.node.res.setHeader('content-type', 'text/xml')
      event.node.res.end(sitemapString)
  });
  