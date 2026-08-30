import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Route =
  | { name: "home" }
  | { name: "shop"; category?: string }
  | { name: "product"; slug: string }
  | { name: "about" }
  | { name: "contact" }
  | { name: "checkout" };

interface RouterState {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterState | null>(null);

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [path, query] = hash.split("?");
  const segments = path.split("/").filter(Boolean);

  if (segments.length === 0) return { name: "home" };
  if (segments[0] === "shop") {
    const params = new URLSearchParams(query ?? "");
    const category = params.get("category") ?? undefined;
    return { name: "shop", category };
  }
  if (segments[0] === "product" && segments[1]) return { name: "product", slug: segments[1] };
  if (segments[0] === "about") return { name: "about" };
  if (segments[0] === "contact") return { name: "contact" };
  if (segments[0] === "checkout") return { name: "checkout" };
  return { name: "home" };
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case "home":
      return "#/";
    case "shop":
      return route.category ? `#/shop?category=${encodeURIComponent(route.category)}` : "#/shop";
    case "product":
      return `#/product/${route.slug}`;
    case "about":
      return "#/about";
    case "contact":
      return "#/contact";
    case "checkout":
      return "#/checkout";
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? { name: "home" } : parseHash()
  );

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((next: Route) => {
    const hash = routeToHash(next);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
    setRoute(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}
