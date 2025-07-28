import { useState, useEffect } from "react"
import { Star, Heart, ShoppingCart, Eye, MapPin, Clock, Phone, MessageCircle, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { useCart } from "@/hooks/use-cart"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"

interface Ad {
  id: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  city: string;
  location: string;
  is_urgent: boolean;
  is_featured: boolean;
  condition?: string;
  created_at: string;
  views_count: number;
  contact_phone?: string;
  contact_email?: string;
}

export function RecentProducts() {
  const [recentAds, setRecentAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  useEffect(() => {
    fetchRecentAds();
  }, []);

  const fetchRecentAds = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('status', 'active')
        .eq('is_featured', false)
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) throw error;
      setRecentAds(data || []);
    } catch (error) {
      console.error('Error fetching recent ads:', error);
    } finally {
      setLoading(false);
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
    return `Il y a ${Math.floor(diffInDays / 7)} semaines`;
  };

  const handleContact = (type: 'whatsapp' | 'phone' | 'email', contact: string, ad: Ad) => {
    if (type === 'whatsapp') {
      const message = `Bonjour, je suis intéressé(e) par votre annonce:
      
🏷️ *${ad.title}*
💰 Prix: ${formatPrice(ad.price, ad.currency)}
📍 Lieu: ${ad.city}
🔗 Lien: ${window.location.origin}/product/${ad.id}

Pourriez-vous me donner plus d'informations?`;
      
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/221${contact.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
    } else if (type === 'phone') {
      window.open(`tel:+221${contact.replace(/\D/g, '')}`, '_blank');
    } else if (type === 'email') {
      window.open(`mailto:${contact}`, '_blank');
    }
    
    toast({
      title: "Contact initié",
      description: `Vous pouvez maintenant contacter le vendeur via ${type}.`,
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Chargement des dernières annonces...</p>
          </div>
        </div>
      </section>
    );
  }

  if (recentAds.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-4">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Dernières annonces</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Produits récents
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les dernières annonces publiées par notre communauté de vendeurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentAds.map((ad, index) => (
            <Card 
              key={ad.id}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => window.location.href = `/product/${ad.id}`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={ad.images[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'} 
                  alt={ad.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge */}
                {ad.is_urgent && (
                  <Badge 
                    variant="destructive"
                    className="absolute top-3 left-3 shadow-lg"
                  >
                    Urgent
                  </Badge>
                )}

                {/* Quick actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8 shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(ad.id);
                    }}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(ad.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8 shadow-lg">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs">{ad.views_count || 0}</span>
                  </Button>
                </div>

                {/* Contact options */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2 mb-2">
                    {ad.contact_phone && (
                      <>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleContact('whatsapp', ad.contact_phone!, ad);
                          }}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          WhatsApp
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleContact('phone', ad.contact_phone!, ad);
                          }}
                        >
                          <Phone className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                    {ad.contact_email && (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleContact('email', ad.contact_email!, ad);
                        }}
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(ad.id);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {ad.city}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {getTimeAgo(ad.created_at)}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {ad.title}
                </h3>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(ad.price, ad.currency)}
                    </span>
                  </div>
                  
                  {ad.condition && (
                    <div className="text-sm text-muted-foreground">
                      État: <span className="font-medium text-foreground">{ad.condition}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-lg"
            onClick={() => window.location.href = '/all-products'}
          >
            Voir toutes les annonces
          </Button>
        </div>
      </div>
    </section>
  )
}