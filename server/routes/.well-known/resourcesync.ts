export default defineEventHandler((event) => {
    const runtimeConfig = useRuntimeConfig();
    const appUrl = runtimeConfig.public.appUrl;
  
    const sitemapString = `<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:rs="http://www.openarchives.org/rs/terms/">
<rs:md capability="description"/>
  <url><loc>${appUrl}/resourcesync/capabilitylist.xml</loc><rs:md capability="capabilitylist"/></url>
</urlset>`;
  
    event.node.res.setHeader("content-type", "text/xml");
    event.node.res.end(sitemapString);
  });
  