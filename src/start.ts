// src/start.ts
import { createStart, createMiddleware } from "@tanstack/react-start";
import {
  getRequestHeader,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";

const localeTzMiddleware = createMiddleware().server(async ({ next }) => {
  const header = getRequestHeader("accept-language");
  const headerLocale = header?.split(",")[0] || "en-US";
  const cookieLocale = getCookie("locale");
  const cookieTz = getCookie("tz"); // set by client later (see Strategy 2)
  const locale = cookieLocale || headerLocale;
  const timeZone = cookieTz || "UTC"; // deterministic until client sends tz
  // Persist locale for subsequent requests (optional)
  setCookie("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return next({ context: { locale, timeZone } });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [localeTzMiddleware],
}));
