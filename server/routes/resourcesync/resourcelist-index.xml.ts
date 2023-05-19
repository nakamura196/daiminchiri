export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const hostname = runtimeConfig.public.appUrl
  const items_: any = await import(`../../../public/data/ids.json`);
  const items = items_.default;

  const size = Math.ceil(items.length / 50000);

  const sitemaps = [];

  const start = new Date().toISOString();

  for (let i = 0; i < size; i++) {
    const t = new Date().toISOString();
    sitemaps.push(
      `<sitemap><loc>${hostname}/resourcesync/resourcelist-${String(i).padStart(
        6,
        "0"
      )}.xml</loc><rs:md at="${t}" completed="${t}" /></sitemap>`
    );
  }

  const end = new Date().toISOString();

  const sitemapString = `<?xml version='1.0' encoding='UTF-8'?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:rs="http://www.openarchives.org/rs/terms/">
<rs:ln href="${hostname}/resourcesync/capabilitylist.xml" rel="up" />
<rs:md at="${start}" capability="resourcelist" completed="${end}" />
${sitemaps.join("\n")}
</sitemapindex>
`;

  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(sitemapString);
});
