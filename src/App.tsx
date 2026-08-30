import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { RouterProvider, useRouter } from "@/store/RouterContext";
import { StoreProvider, useStore } from "@/store/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import CheckoutPage from "@/pages/CheckoutPage";

function Pages() {
  const { route } = useRouter();
  const { cartCount } = useStore();
  const [cartOpen, setCartOpen] = useState(false);

  // Open cart drawer when items are added via navbar bag? We use a floating cart button instead.
  useEffect(() => {
    // close drawer on route change
    setCartOpen(false);
  }, [route]);

  return (
    <div className="relative min-h-screen bg-ink">
      <Navbar />

      <main>
        {route.name === "home" && <HomePage />}
        {route.name === "shop" && <ShopPage />}
        {route.name === "product" && <ProductDetailPage slug={route.slug} />}
        {route.name === "about" && <AboutPage />}
        {route.name === "contact" && <ContactPage />}
        {route.name === "checkout" && <CheckoutPage />}
      </main>

      <Footer />
      <WhatsAppButton />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Floating cart button (mobile-friendly quick access) */}
      {cartCount > 0 && route.name !== "checkout" && (
        <button
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-gold px-5 py-3.5 font-semibold text-black shadow-lg shadow-gold/30 transition-all hover:scale-105"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-sm">{cartCount}</span>
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider>
        <Pages />
      </RouterProvider>
    </StoreProvider>
  );
}
