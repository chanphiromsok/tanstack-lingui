import {
  createRequestHandler,
  defaultStreamHandler,
} from "@tanstack/react-router/ssr/server";
import { getRouter } from "./router";
import { setupI18n } from "@lingui/core";
import { getLocaleFromRequest } from "./modules/lingui/i18nserver";
import { dynamicActivate } from "./modules/lingui/i18n";
import { createStartHandler } from "@tanstack/react-start/server";
import { createIsomorphicFn } from "@tanstack/react-start";

export async function render({ request }: { request: Request }) {
  console.error("NMSDFSD");

  const locale = getLocaleFromRequest();
  const i18n = createIsomorphicFn()
    .server(() => setupI18n({}))
    .client(() => setupI18n({}))();

  if (i18n) {
    console.error("Has");
  } else {
    console.error("NMSDFSD");
  }

  await dynamicActivate(i18n, locale);

  const handler = createRequestHandler({
    request,
    createRouter: () => getRouter({ i18n }),
  });
  createStartHandler;

  return await handler(defaultStreamHandler);
}
