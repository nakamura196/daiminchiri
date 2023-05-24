/*
*/

export default defineNuxtRouteMiddleware((to, _from) => {
    // 直接末尾スラッシュなしアクセスした場合を考慮
    if (to.path.endsWith('index.html')) {
      return navigateTo(
        { path: to.path.replace(/index.html$/, ''), query: to.query },
        { redirectCode: 301 }
      )
    }
    // 末尾スラッシュありにリダイレクト
    if (!to.path.endsWith('/')) {
      return navigateTo({ path: `${to.path}/`, query: to.query }, { redirectCode: 301 })
    }
  })
  

  /*
export default function ({ path, query, hash }: any) {
  if (path === "/" || !path.endsWith("/")) return;

  const nextPath = path.replace(/\/+$/, "") || "/";
  const nextRoute = { path: nextPath, query, hash };

  // 308 Permanent Redirect
  return navigateTo(nextRoute, { redirectCode: 308 });
}
*/
