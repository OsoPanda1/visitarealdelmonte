import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/mapa")({
  loader: () => {
    throw redirect({ to: "/atlas" });
  },
});
