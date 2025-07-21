import { Smartphone, Laptop, Car, Home, Briefcase, Heart, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  {
    icon: Smartphone,
    name: "Téléphones & Tablettes",
    count: "8,234",
    color: "from-blue-500 to-cyan-500",
    href: "/category/phones"
  },
  {
    icon: Laptop,
    name: "Informatique & Électronique",
    count: "5,672",
    color: "from-purple-500 to-indigo-500",
    href: "/category/electronics"
  },
  {
    icon: Car,
    name: "Véhicules",
    count: "3,456",
    color: "from-red-500 to-rose-500",
    href: "/category/vehicles"
  },
  {
    icon: Home,
    name: "Immobilier",
    count: "2,890",
    color: "from-green-500 to-emerald-500",
    href: "/category/real-estate"
  },
  {
    icon: Briefcase,
    name: "Emploi & Services",
    count: "4,123",
    color: "from-orange-500 to-amber-500",
    href: "/category/jobs"
  },
  {
    icon: Heart,
    name: "Mode & Beauté",
    count: "6,789",
    color: "from-pink-500 to-rose-500",
    href: "/category/fashion"
  }
]

export function CategoriesSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Catégories populaires</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trouvez ce que vous
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              cherchez facilement
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des milliers d'annonces dans toutes les catégories. 
            Découvrez les offres les plus récentes et les meilleures affaires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <Card 
              key={category.name}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{category.count}</div>
                    <div className="text-sm text-muted-foreground">annonces</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  Découvrez notre sélection de produits et services de qualité
                </p>

                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-primary hover:bg-primary/10 p-0 h-auto font-medium"
                >
                  Explorer cette catégorie
                  <Zap className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Voir toutes les catégories
          </Button>
        </div>
      </div>
    </section>
  )
}