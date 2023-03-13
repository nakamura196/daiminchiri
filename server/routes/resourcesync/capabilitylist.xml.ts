export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  const hostname = runtimeConfig.public.appUrl

  const sitemapString = `<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:rs="http://www.openarchives.org/rs/terms/">
<rs:ln href="${hostname}/.well-known/resourcesync" rel="up" />
<rs:md capability="capabilitylist" />
<url><loc>${hostname}/resourcesync/resourcelist-index.xml</loc><rs:md capability="resourcelist" /></url>
</urlset>`;

  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(sitemapString);
});
