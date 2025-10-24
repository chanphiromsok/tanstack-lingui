// src/entry-server.tsx
import {
  createRequestHandler,
  renderRouterToStream,
  RouterServer,
} from "@tanstack/react-router/ssr/server";
import handler from "@tanstack/react-start/server-entry";
import { getRouter } from "./router";

export async function render({ request }: { request: Request }) {
  const handler = createRequestHandler({
    request,
    createRouter() {
      return getRouter();
    },
  });

  return handler(({ request, responseHeaders, router }) =>
    renderRouterToStream({
      request,
      responseHeaders,
      router,
      children: <RouterServer router={router} />,
    })
  );
}

export default {
  fetch(request: Request) {
    return handler.fetch(request);
  },
};
