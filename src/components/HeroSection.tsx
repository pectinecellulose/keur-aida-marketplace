import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
const features = [{
  icon: Shield,
  title: "Sécurisé",
  description: "Transactions protégées"
}, {
  icon: Zap,
  title: "Rapide",
  description: "Livraison express"
}, {
  icon: TrendingUp,
  title: "Tendance",
  description: "Produits populaires"
}];
const stats = [{
  value: "50K+",
  label: "Annonces"
}, {
  value: "15K+",
  label: "Utilisateurs"
}, {
  value: "25",
  label: "Catégories"
}, {
  value: "98%",
  label: "Satisfaction"
}];
export function HeroSection() {
  const navigate = useNavigate();
  return <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-light/20 text-primary-foreground border border-primary-light/30">
                <span className="text-sm font-medium">🎉 Nouvelle plateforme</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Votre marketplace
                <span className="block bg-gradient-to-r from-white to-primary-light bg-clip-text text-transparent">
                  de confiance
                </span>
              </h1>
              
              <p className="text-xl text-primary-foreground/80 max-w-lg">
                Découvrez des milliers d'annonces locales. Achetez, vendez et trouvez 
                tout ce dont vous avez besoin en toute sécurité.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl" onClick={() => navigate('/all-products')}>
                Explorer les annonces
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/post-ad')} className="border-white/30 text-white backdrop-blur-sm bg-black">
                Publier une annonce
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {features.map((feature, index) => <div key={feature.title} className="text-center animate-fade-in-up" style={{
              animationDelay: `${index * 0.2}s`
            }}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-3">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                  <p className="text-xs text-white/70">{feature.description}</p>
                </div>)}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in-right">
            {/* Floating Stats Card - Moved above image */}
            <Card className="mb-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl animate-float">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  {stats.map((stat, index) => <div key={stat.label}>
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            <div className="relative z-10">
              <img src={heroImage} alt="KeurAida Marketplace" className="w-full h-auto rounded-2xl shadow-2xl" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary-light/30 to-primary/30 animate-bounce-light"></div>
            <div className="absolute top-1/2 -left-8 w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/10 animate-float" style={{
            animationDelay: '1s'
          }}></div>
          </div>
        </div>
      </div>
    </section>;
}