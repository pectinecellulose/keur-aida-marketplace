import { Star, Heart, ShoppingCart, Eye, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featuredProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - 256GB",
    price: "1,200,000",
    originalPrice: "1,350,000",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 124,
    location: "Dakar, Plateau",
    seller: "TechStore Pro",
    badge: "Urgent",
    badgeColor: "destructive",
    featured: true
  },
  {
    id: 2,
    title: "MacBook Air M2 - 8GB RAM",
    price: "950,000",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 89,
    location: "Dakar, Almadies",
    seller: "Apple Center",
    badge: "Premium",
    badgeColor: "default",
    featured: true
  },
  {
    id: 3,
    title: "Toyota Camry 2020 - Automatique",
    price: "18,500,000",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 45,
    location: "Dakar, Liberté 6",
    seller: "AutoPlus",
    badge: "Vérifié",
    badgeColor: "default",
    featured: true
  },
  {
    id: 4,
    title: "Appartement F4 - Vue sur mer",
    price: "85,000,000",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 23,
    location: "Dakar, Corniche",
    seller: "Immobilier Elite",
    badge: "Exclusif",
    badgeColor: "default",
    featured: true
  }
]

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            <Star className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Sélection premium</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Annonces à la une
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection d'annonces premium vérifiées et recommandées par notre équipe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge */}
                <Badge 
                  variant={product.badgeColor as any}
                  className="absolute top-3 left-3 shadow-lg"
                >
                  {product.badge}
                </Badge>

                {/* Quick actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="icon" variant="secondary" className="h-8 w-8 shadow-lg">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8 shadow-lg">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                {/* Bottom overlay with action */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground shadow-lg"
                    onClick={() => window.location.href = `/product/${product.id}`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Voir l'annonce
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>

                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {product.location}
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      {product.price} FCFA
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice} FCFA
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Par <span className="font-medium text-foreground">{product.seller}</span>
                  </div>
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
            Voir toutes les annonces premium
          </Button>
        </div>
      </div>
    </section>
  )
}