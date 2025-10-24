import {
  getRequestHeaders,
  getRequest,
  setResponseHeader,
} from "@tanstack/react-start/server";
import { parse, serialize } from "cookie-es";

import { defaultLocale, dynamicActivate, isLocaleValid } from "./i18n";
import { createIsomorphicFn } from "@tanstack/react-start";

function getLocaleFromRequest() {
  const request = getRequest();
  const headers = getRequestHeaders();
  const cookie = parse(headers.get("Cookie") ?? "");

  console.log("getRequestHeaders", cookie);

  if (request) {
    const url = new URL(request.url);
    const queryLocale = url.searchParams.get("locale") ?? "";

    if (isLocaleValid(queryLocale)) {
      setResponseHeader(
        "Set-Cookie",
        serialize("locale", queryLocale, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })
      );

      return queryLocale;
    }
  }

  if (cookie.locale && isLocaleValid(cookie.locale)) {
    return cookie.locale;
  }

  setResponseHeader(
    "Set-Cookie",
    serialize("locale", defaultLocale, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
  );

  console.log("defaultLocale", defaultLocale);

  return defaultLocale;
}

export const setupLocaleFromRequest = createIsomorphicFn()
  .server(() => dynamicActivate(getLocaleFromRequest()))
  .client(() => dynamicActivate(getLocaleFromRequest()));
