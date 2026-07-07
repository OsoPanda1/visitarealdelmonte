import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // @ts-expect-error - @tanstack/react-router requires strictNullChecks: true, but enabling it globally causes 200+ errors across the codebase
  const router = createRouter<typeof routeTree>({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
