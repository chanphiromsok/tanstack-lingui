import { QueryClient } from "@tanstack/react-query";
import { createRouter as createReactRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { i18n } from "@lingui/core";
import { createIsomorphicFn } from "@tanstack/react-start";
import { dynamicActivate } from "./modules/lingui/i18n";
import { I18nProvider } from "@lingui/react";
import { getLocaleFromRequest } from "./modules/lingui/i18nserver";
const isomorphicI18 = createIsomorphicFn()
  .server(() => {
    dynamicActivate(getLocaleFromRequest());
    return i18n;
  })
  .client(() => {
    dynamicActivate("km");
    return i18n;
  });

export function getRouter() {
  const queryClient = new QueryClient();
  const i18n = isomorphicI18();
  const router = createReactRouter({
    routeTree,
    context: { queryClient, i18n },
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    defaultPreload: "intent",
    Wrap: ({ children }) => {
      return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
