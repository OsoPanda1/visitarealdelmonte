import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/quienes-somos")({
  loader: () => {
    throw redirect({ to: "/nodo-cero" });
  },
});
