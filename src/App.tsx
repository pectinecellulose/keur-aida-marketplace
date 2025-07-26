import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/use-cart";
import { FavoritesProvider } from "@/hooks/use-favorites";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import Newsletter from "./pages/Newsletter";
import HowItWorks from "./pages/HowItWorks";
import PostAd from "./pages/PostAd";
import Security from "./pages/Security";
import SellerTips from "./pages/SellerTips";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import EditAd from "./pages/EditAd";
import Profile from "./pages/Profile";
import Legal from "./pages/Legal";
import Cookies from "./pages/Cookies";
import Status from "./pages/Status";
import Report from "./pages/Report";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="keuraida-ui-theme">
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/all-products" element={<AllProducts />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/newsletter" element={<Newsletter />} />
                  <Route path="/category/:categorySlug" element={<CategoryPage />} />
                  <Route path="/category/:categorySlug/:subcategorySlug" element={<CategoryPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/edit-ad/:id" element={<EditAd />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/post-ad" element={<PostAd />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/seller-tips" element={<SellerTips />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/legal" element={<Legal />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/status" element={<Status />} />
                  <Route path="/report" element={<Report />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
