// src/entry-client.tsx
import { hydrateRoot } from "react-dom/client";
import { RouterClient } from "@tanstack/react-router/ssr/client";
import { getRouter } from "./router";
import { StrictMode } from "react";

const router = getRouter();

hydrateRoot(
  document,
  <StrictMode>
    <RouterClient router={router} />
  </StrictMode>
);
