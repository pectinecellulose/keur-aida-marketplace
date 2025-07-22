import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Clock, Star, Heart } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  description: string;
  parent_id: string | null;
  display_order: number;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  city: string;
  images: string[];
  is_negotiable: boolean;
  is_featured: boolean;
  is_urgent: boolean;
  condition: string;
  created_at: string;
  category_id: string;
}

const Categories = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    fetchCategoriesAndAds();
  }, [categorySlug, subcategorySlug]);

  const fetchCategoriesAndAds = async () => {
    setLoading(true);
    try {
      // Fetch all categories
      const { data: allCategories, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .order("display_order");

      if (categoriesError) throw categoriesError;
      setCategories(allCategories || []);

      // Find current category
      const category = allCategories?.find(cat => cat.slug === categorySlug);
      setCurrentCategory(category || null);

      if (category) {
        // Fetch subcategories
        const subs = allCategories?.filter(cat => cat.parent_id === category.id) || [];
        setSubcategories(subs);

        // Determine which category to use for ads
        let targetCategoryId = category.id;
        if (subcategorySlug) {
          const subcategory = subs.find(sub => sub.slug === subcategorySlug);
          if (subcategory) {
            targetCategoryId = subcategory.id;
          }
        }

        // Fetch ads for category
        const { data: adsData, error: adsError } = await supabase
          .from("ads")
          .select("*")
          .eq("category_id", targetCategoryId)
          .eq("status", "active")
          .order("created_at", { ascending: false });

        if (adsError) throw adsError;
        setAds(adsData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency === 'XOF' ? 'XOF' : 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Il y a moins d'1h";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          {currentCategory && (
            <>
              <Link to={`/category/${currentCategory.slug}`} className="hover:text-primary">
                {currentCategory.emoji} {currentCategory.name}
              </Link>
              {subcategorySlug && (
                <>
                  <span>/</span>
                  <span className="text-foreground font-medium">
                    {subcategories.find(sub => sub.slug === subcategorySlug)?.name}
                  </span>
                </>
              )}
            </>
          )}
        </nav>

        {/* Category Header */}
        {currentCategory && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <span className="text-4xl">{currentCategory.emoji}</span>
              {currentCategory.name}
            </h1>
            <p className="text-muted-foreground">{currentCategory.description}</p>
          </div>
        )}

        {/* Subcategories */}
        {subcategories.length > 0 && !subcategorySlug && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Sous-catégories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/category/${categorySlug}/${subcategory.slug}`}
                  className="group"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{subcategory.emoji || "📦"}</div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {subcategory.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher dans cette catégorie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récent</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="featured">À la une</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les prix</SelectItem>
                  <SelectItem value="0-50000">0 - 50k XOF</SelectItem>
                  <SelectItem value="50000-200000">50k - 200k XOF</SelectItem>
                  <SelectItem value="200000-500000">200k - 500k XOF</SelectItem>
                  <SelectItem value="500000+">500k+ XOF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Ads Grid */}
        {ads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ads.map((ad) => (
              <Card key={ad.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div className="relative">
                  {ad.images.length > 0 ? (
                    <img
                      src={ad.images[0]}
                      alt={ad.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Pas d'image</span>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {ad.is_featured && (
                      <Badge variant="default" className="text-xs">
                        À la une
                      </Badge>
                    )}
                    {ad.is_urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {ad.title}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-primary">
                        {formatPrice(ad.price, ad.currency)}
                        {ad.is_negotiable && (
                          <span className="text-sm text-muted-foreground font-normal ml-1">
                            négociable
                          </span>
                        )}
                      </div>
                      {ad.condition && (
                        <Badge variant="outline" className="text-xs">
                          {ad.condition === 'new' ? 'Neuf' : ad.condition === 'like_new' ? 'Comme neuf' : 'Occasion'}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{ad.city}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{getTimeAgo(ad.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">Aucune annonce trouvée</h3>
            <p className="text-muted-foreground mb-4">
              Soyez le premier à publier une annonce dans cette catégorie !
            </p>
            <Button>Publier une annonce</Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;