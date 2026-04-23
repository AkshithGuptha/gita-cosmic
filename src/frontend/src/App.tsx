import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {
  NotFoundRoute,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const Landing = lazy(() => import("@/pages/Landing"));
const Chapters = lazy(() => import("@/pages/Chapters"));
const ChapterDetail = lazy(() => import("@/pages/ChapterDetail"));
const SlokaDetail = lazy(() => import("@/pages/SlokaDetail"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));

function LoadingSpinner() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background"
      data-ocid="app.loading_state"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
          aria-label="Loading"
        />
        <span className="font-display text-primary glow-golden text-2xl animate-glow-pulse">
          ॐ
        </span>
      </div>
    </div>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--primary) / 0.3)",
            color: "oklch(var(--foreground))",
          },
        }}
      />
    </LanguageProvider>
  );
}

const rootRoute = createRootRoute({ component: RootComponent });

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

const chaptersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chapters",
  component: Chapters,
});

const chapterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chapter/$id",
  component: ChapterDetail,
});

const slokaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sloka/$chapter/$number",
  component: SlokaDetail,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
      <span className="font-display text-primary glow-golden text-5xl">ॐ</span>
      <h1 className="font-display text-2xl text-foreground">Page Not Found</h1>
      <a
        href="/"
        className="text-primary hover:text-primary/80 transition-smooth text-sm"
      >
        Return Home
      </a>
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  chaptersRoute,
  chapterDetailRoute,
  slokaDetailRoute,
  searchRoute,
]);

const router = createRouter({ routeTree, notFoundRoute });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
