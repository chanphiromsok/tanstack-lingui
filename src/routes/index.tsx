import { Trans } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { dynamicActivate } from "~/modules/lingui/i18n";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>
        <Trans>Welcome Home!!!</Trans>
      </h3>
      <button
        onClick={() => {
          dynamicActivate("km");
          console.log("SDf");
          
        }}
      >
        <Trans>KM</Trans>
      </button>
      <button
        onClick={() => {
          dynamicActivate("en");
        }}
      >
        <Trans>EN</Trans>
      </button>
    </div>
  );
}
