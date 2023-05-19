export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  const hostname = runtimeConfig.public.appUrl;
  const txts: string[] = [];
  txts.push("User-agent: *");
  txts.push(`Sitemap: ${hostname}/sitemap.xml`);
  txts.push(`Sitemap: ${hostname}/resourcesync/resourcelist-index.xml`);
  event.node.res.setHeader("content-type", "text/plain");
  event.node.res.end(txts.join("\n"));
});
