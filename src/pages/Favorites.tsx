import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFavorites } from '@/hooks/use-favorites';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

interface Ad {
  id: string;
  title: string;
  price: number;
  images: string[];
  location: string;
  created_at: string;
}

export default function Favorites() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    if (user && favorites.length > 0) {
      loadFavoriteAds();
    } else {
      setIsLoading(false);
    }
  }, [favorites, user]);

  const loadFavoriteAds = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('id, title, price, images, location, created_at')
        .in('id', favorites)
        .eq('status', 'active');

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error('Error loading favorite ads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Connectez-vous pour voir vos favoris</h2>
            <p className="text-muted-foreground mb-6">
              Sauvegardez vos produits préférés en vous connectant
            </p>
            <Button asChild>
              <Link to="/auth">Se connecter</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4">Chargement de vos favoris...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Aucun favori pour le moment</h2>
            <p className="text-muted-foreground mb-6">
              Ajoutez des produits à vos favoris pour les retrouver facilement
            </p>
            <Button asChild>
              <Link to="/">Découvrir des produits</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mes Favoris ({ads.length} produits)</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ads.map((ad) => (
            <Card key={ad.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                    {ad.images?.[0] ? (
                      <img 
                        src={ad.images[0]} 
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(ad.id)}
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{ad.title}</h3>
                  <p className="text-lg font-bold text-primary mb-1">
                    {ad.price?.toLocaleString()} FCFA
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">{ad.location}</p>
                  
                  <Button asChild className="w-full" size="sm">
                    <Link to={`/ad/${ad.id}`}>Voir l'annonce</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}