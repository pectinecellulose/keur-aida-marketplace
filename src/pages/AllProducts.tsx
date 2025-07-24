import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, Grid, List, Heart, ShoppingCart, MapPin, Star, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/use-cart";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  city: string;
  images: string[];
  is_featured: boolean;
  is_urgent: boolean;
  condition: string;
  created_at: string;
  category_id: string;
  user_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
}

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ads, setAds] = useState<Ad[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'created_at');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  
  const { addToCart, isLoading: cartLoading } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [searchTerm, selectedCategory, sortBy, selectedCondition, selectedLocation]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, name, slug, emoji')
        .eq('is_active', true);

      if (categoriesData) {
        setCategories(categoriesData);
      }

      // Build ads query
      let query = supabase
        .from('ads')
        .select('*')
        .eq('status', 'active');

      // Apply filters
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }
      
      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      if (selectedCondition.length > 0) {
        query = query.in('condition', selectedCondition);
      }

      if (selectedLocation) {
        query = query.ilike('city', `%${selectedLocation}%`);
      }

      // Apply price range
      query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);

      // Apply sorting
      if (sortBy === 'price_asc') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price_desc') {
        query = query.order('price', { ascending: false });
      } else if (sortBy === 'created_at') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'title') {
        query = query.order('title', { ascending: true });
      }

      const { data: adsData, error } = await query;

      if (error) throw error;
      setAds(adsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les produits.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams('q', searchTerm);
  };

  const handleAddToCart = async (adId: string) => {
    try {
      await addToCart(adId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleToggleFavorite = async (adId: string) => {
    try {
      await toggleFavorite(adId);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + currency;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Hier";
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffInDays / 30)} mois`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Tous les produits</h1>
          <p className="text-muted-foreground">{ads.length} produits trouvés</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-surface rounded-lg p-6 mb-8 border border-border">
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher des produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Rechercher</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </form>

          {showFilters && (
            <div className="border-t border-border pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Catégorie</label>
                  <Select value={selectedCategory} onValueChange={(value) => {
                    setSelectedCategory(value);
                    updateSearchParams('category', value);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Toutes les catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.emoji} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Trier par</label>
                  <Select value={sortBy} onValueChange={(value) => {
                    setSortBy(value);
                    updateSearchParams('sort', value);
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Plus récents</SelectItem>
                      <SelectItem value="price_asc">Prix croissant</SelectItem>
                      <SelectItem value="price_desc">Prix décroissant</SelectItem>
                      <SelectItem value="title">Nom A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Ville</label>
                  <Input
                    placeholder="Ville"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Prix (FCFA)</label>
                <div className="px-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000000}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>{formatPrice(priceRange[0], 'FCFA')}</span>
                    <span>{formatPrice(priceRange[1], 'FCFA')}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Condition</label>
                <div className="flex gap-4">
                  {['Neuf', 'Comme neuf', 'Bon état', 'État moyen'].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={selectedCondition.includes(condition)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCondition([...selectedCondition, condition]);
                          } else {
                            setSelectedCondition(selectedCondition.filter(c => c !== condition));
                          }
                        }}
                      />
                      <label htmlFor={condition} className="text-sm">{condition}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Chargement des produits...</p>
          </div>
        ) : ads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Aucun produit trouvé</p>
            <p className="text-sm text-muted-foreground mt-2">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {ads.map((ad) => (
              <Card key={ad.id} className={`group cursor-pointer hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                  <img
                    src={ad.images[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}
                    alt={ad.title}
                    className={`object-cover group-hover:scale-105 transition-transform duration-300 ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                  />
                  
                  {(ad.is_featured || ad.is_urgent) && (
                    <Badge 
                      variant={ad.is_urgent ? "destructive" : "default"}
                      className="absolute top-2 left-2"
                    >
                      {ad.is_urgent ? "Urgent" : "Premium"}
                    </Badge>
                  )}

                  <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleFavorite(ad.id);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite(ad.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                </div>

                <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      {ad.city}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {getTimeAgo(ad.created_at)}
                    </div>
                  </div>

                  <h3 className={`font-semibold text-foreground mb-2 line-clamp-2 ${viewMode === 'list' ? 'text-lg' : ''}`}>
                    {ad.title}
                  </h3>

                  {viewMode === 'list' && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {ad.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(ad.price, ad.currency)}
                      </span>
                      {ad.condition && (
                        <p className="text-xs text-muted-foreground">{ad.condition}</p>
                      )}
                    </div>

                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(ad.id);
                      }}
                      disabled={cartLoading}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Panier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllProducts;