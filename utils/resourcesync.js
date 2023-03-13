const $rs = (ids) => {
  const routes = [
    "/.well-known/resourcesync",
    "/resourcesync/capabilitylist.xml",
    "/robots.txt",
    "/resourcesync/resourcelist-index.xml",
  ];

  const size = Math.ceil(ids.length / 50000);

  for (let i = 0; i < size; i++) {
    routes.push(`/resourcesync/resourcelist-${String(i).padStart(6, "0")}.xml`);
  }

  return routes;
};

export { $rs };
