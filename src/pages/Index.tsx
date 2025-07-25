import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { CategoriesSection } from "@/components/CategoriesSection"
import { FeaturedProducts } from "@/components/FeaturedProducts"
import { RecentProducts } from "@/components/RecentProducts"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <RecentProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
