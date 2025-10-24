import { QueryClient } from "@tanstack/react-query";
import { createRouter as createReactRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { I18n } from "@lingui/core";
import { routerWithLingui } from "./modules/lingui/router-plugin";

export function getRouter({ i18n }: { i18n: I18n }) {
  const queryClient = new QueryClient();
  const router = routerWithLingui(
    createReactRouter({
      routeTree,
      context: { queryClient, i18n },
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      scrollRestoration: true,
      defaultPreload: "intent",
    }),
    i18n
  );

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
