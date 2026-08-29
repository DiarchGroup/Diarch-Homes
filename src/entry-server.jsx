import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import { AppShell } from "@/App";

export function render(url) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: false } },
  });
  return renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </QueryClientProvider>,
  );
}

// Re-exported so the prerender script only loads one SSR bundle.
export { ROUTES, SITE, organizationSchema } from "@/data/seo";
