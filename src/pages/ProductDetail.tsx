import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Heart, 
  ShoppingCart, 
  MapPin, 
  Clock, 
  Share2, 
  MessageCircle, 
  Phone, 
  Mail,
  Shield,
  Eye,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  is_negotiable: boolean;
  condition: string;
  created_at: string;
  views_count: number;
  contact_email?: string;
  contact_phone?: string;
  category_id: string;
  user_id: string;
}

interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  seller_rating: number;
  total_sales: number;
  is_verified: boolean;
}

interface Category {
  id: string;
  name: string;
  emoji: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [seller, setSeller] = useState<Profile | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedAds, setRelatedAds] = useState<Ad[]>([]);
  
  const { addToCart, isLoading: cartLoading } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchAdDetails();
    }
  }, [id]);

  const fetchAdDetails = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      // Fetch ad details
      const { data: adData, error: adError } = await supabase
        .from('ads')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .maybeSingle();

      if (adError) throw adError;
      if (!adData) {
        navigate('/');
        return;
      }
      setAd(adData);

      // Utiliser la fonction sécurisée pour incrémenter les vues
      const { error: viewError } = await supabase.rpc('increment_ad_views', {
        ad_uuid: id
      });

      if (viewError) {
        console.warn('Error incrementing views:', viewError);
      }

      // Fetch seller profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', adData.user_id)
        .maybeSingle();

      setSeller(profileData);

      // Fetch category
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id, name, emoji')
        .eq('id', adData.category_id)
        .maybeSingle();

      setCategory(categoryData);

      // Fetch related ads
      const { data: relatedData } = await supabase
        .from('ads')
        .select('*')
        .eq('category_id', adData.category_id)
        .eq('status', 'active')
        .neq('id', id)
        .limit(4);

      setRelatedAds(relatedData || []);
    } catch (error) {
      console.error('Error fetching ad details:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du produit.",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!ad) return;
    try {
      await addToCart(ad.id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!ad) return;
    try {
      await toggleFavorite(ad.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: ad?.title,
        text: ad?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien du produit a été copié dans le presse-papiers.",
      });
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

  const nextImage = () => {
    if (ad && ad.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % ad.images.length);
    }
  };

  const prevImage = () => {
    if (ad && ad.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + ad.images.length) % ad.images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Chargement...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Produit non trouvé</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Retour à l'accueil
            </Button>
          </div>
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
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => navigate('/')} className="hover:text-foreground">
            Accueil
          </button>
          <span>/</span>
          {category && (
            <>
              <span>{category.emoji} {category.name}</span>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{ad.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={ad.images[currentImageIndex] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'}
                    alt={ad.title}
                    className="w-full h-96 lg:h-[500px] object-cover rounded-t-lg"
                  />
                  
                  {ad.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-lg"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-lg"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {ad.is_urgent && (
                      <Badge variant="destructive">Urgent</Badge>
                    )}
                    {ad.is_featured && (
                      <Badge variant="default">Premium</Badge>
                    )}
                    {ad.is_negotiable && (
                      <Badge variant="outline">Négociable</Badge>
                    )}
                  </div>

                  {/* Image indicators */}
                  {ad.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {ad.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-primary' : 'bg-background/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail gallery */}
                {ad.images.length > 1 && (
                  <div className="p-4 grid grid-cols-4 gap-2">
                    {ad.images.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${ad.title} ${index + 1}`}
                        className={`w-full h-20 object-cover rounded cursor-pointer border-2 ${
                          index === currentImageIndex ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product Info & Actions */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{(ad.views_count || 0) + 1} vues</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{getTimeAgo(ad.created_at)}</span>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-foreground mb-4">{ad.title}</h1>

                <div className="flex items-center space-x-2 text-lg text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{ad.location}, {ad.city}</span>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(ad.price, ad.currency)}
                  </span>
                  {ad.is_negotiable && (
                    <span className="text-sm text-muted-foreground ml-2">(Négociable)</span>
                  )}
                </div>

                {ad.condition && (
                  <div className="mb-4">
                    <span className="text-sm font-medium">État: </span>
                    <span className="text-sm text-muted-foreground">{ad.condition}</span>
                  </div>
                )}

                <div className="flex space-x-2 mb-6">
                  <Button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(ad.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <Separator className="my-6" />

                {/* Seller Info */}
                {seller && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Vendeur</h3>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={seller.avatar_url} />
                        <AvatarFallback>
                          {seller.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{seller.full_name}</span>
                          {seller.is_verified && (
                            <Shield className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                            <span>{seller.seller_rating.toFixed(1)}</span>
                          </div>
                          <span>•</span>
                          <span>{seller.total_sales} ventes</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Envoyer un message
                      </Button>
                      {ad.contact_phone && (
                        <>
                          <Button 
                            variant="outline" 
                            className="w-full bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
                            onClick={() => window.open(`https://wa.me/221${ad.contact_phone!.replace(/\D/g, '')}`, '_blank')}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            WhatsApp
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => window.open(`tel:+221${ad.contact_phone!.replace(/\D/g, '')}`, '_blank')}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Appeler
                          </Button>
                        </>
                      )}
                      {ad.contact_email && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => window.open(`mailto:${ad.contact_email}`, '_blank')}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Envoyer un email
                        </Button>
                      )}
                      
                      {/* Contact du site KeurAida */}
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2">Besoin d'aide avec cette annonce ?</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => window.open('https://wa.me/221785973747', '_blank')}
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Support
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => window.open('mailto:cbteranga@gmail.com', '_blank')}
                          >
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <div className="prose max-w-none text-muted-foreground">
              <p className="whitespace-pre-wrap">{ad.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedAds.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedAds.map((relatedAd) => (
                <Card key={relatedAd.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate(`/product/${relatedAd.id}`)}>
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedAd.images[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}
                      alt={relatedAd.title}
                      className="w-full h-48 object-cover"
                    />
                    {relatedAd.is_urgent && (
                      <Badge variant="destructive" className="absolute top-2 left-2">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {relatedAd.title}
                    </h3>
                    <div className="text-lg font-bold text-primary">
                      {formatPrice(relatedAd.price, relatedAd.currency)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {relatedAd.city}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;