// src/entry-client.tsx
import { hydrateRoot } from "react-dom/client";
import { RouterClient } from "@tanstack/react-router/ssr/client";
import { getRouter } from "./router";
import { startTransition, StrictMode } from "react";
import { setupI18n } from "@lingui/core";

const i18n = setupI18n({});
const router = getRouter({ i18n: i18n });

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RouterClient router={router} />
    </StrictMode>
  );
});
