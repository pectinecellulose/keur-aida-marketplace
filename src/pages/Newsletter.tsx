import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Sparkles, 
  Zap, 
  Gift, 
  Smartphone, 
  Car, 
  Home, 
  ShoppingBag,
  CheckCircle 
} from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: "tech", name: "Électronique & Tech", icon: Smartphone, color: "bg-blue-500" },
    { id: "auto", name: "Véhicules", icon: Car, color: "bg-green-500" },
    { id: "immobilier", name: "Immobilier", icon: Home, color: "bg-purple-500" },
    { id: "mode", name: "Mode & Beauté", icon: ShoppingBag, color: "bg-pink-500" },
    { id: "deals", name: "Offres Spéciales", icon: Gift, color: "bg-orange-500" },
  ];

  const benefits = [
    "Alertes en temps réel sur les nouveaux produits",
    "Accès prioritaire aux offres exclusives",
    "Notifications de baisse de prix",
    "Conseils d'achat personnalisés",
    "Promotions réservées aux abonnés"
  ];

  const handlePreferenceChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setPreferences([...preferences, categoryId]);
    } else {
      setPreferences(preferences.filter(p => p !== categoryId));
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email requis",
        description: "Veuillez saisir votre adresse email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez bientôt notre première newsletter.",
      });
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Merci de votre inscription !
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Vous êtes maintenant abonné(e) à la newsletter KeurAida. 
              Vous recevrez bientôt des offres exclusives et les dernières nouveautés.
            </p>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Email: {email}</h3>
                  {name && <p className="text-muted-foreground mb-4">Nom: {name}</p>}
                  {preferences.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Catégories sélectionnées:</p>
                      <div className="flex flex-wrap gap-2">
                        {preferences.map(prefId => {
                          const category = categories.find(c => c.id === prefId);
                          return category ? (
                            <Badge key={prefId} variant="outline">
                              {category.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Button onClick={() => window.location.href = "/"} size="lg">
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Newsletter Exclusive</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Restez informé(e) des meilleures offres
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Recevez en avant-première les nouvelles annonces, les offres exclusives et les conseils d'achat 
            directement dans votre boîte mail. Plus de 50,000 abonnés nous font déjà confiance !
          </p>

          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-primary" />
              <span>Newsletter hebdomadaire</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              <span>Alertes instantanées</span>
            </div>
            <div className="flex items-center">
              <Gift className="w-4 h-4 mr-2 text-primary" />
              <span>Offres exclusives</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Subscription Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">S'abonner à la newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubscribe} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nom (optionnel)
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Votre nom"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-4">
                        Catégories d'intérêt (optionnel)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <div key={category.id} className="flex items-center space-x-3">
                              <Checkbox
                                id={category.id}
                                checked={preferences.includes(category.id)}
                                onCheckedChange={(checked) => 
                                  handlePreferenceChange(category.id, checked as boolean)
                                }
                              />
                              <label 
                                htmlFor={category.id} 
                                className="flex items-center space-x-2 text-sm cursor-pointer"
                              >
                                <div className={`w-6 h-6 rounded-md ${category.color} flex items-center justify-center`}>
                                  <Icon className="w-3 h-3 text-white" />
                                </div>
                                <span>{category.name}</span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox id="consent" required />
                        <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                          J'accepte de recevoir la newsletter de KeurAida et je comprends que je peux me désabonner à tout moment. 
                          En m'inscrivant, j'accepte les{" "}
                          <a href="/terms" className="text-primary hover:underline">
                            conditions d'utilisation
                          </a>{" "}
                          et la{" "}
                          <a href="/privacy" className="text-primary hover:underline">
                            politique de confidentialité
                          </a>.
                        </label>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2"></div>
                          Inscription en cours...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          S'abonner gratuitement
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pourquoi s'abonner ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
                    <div className="text-sm text-muted-foreground">Abonnés satisfaits</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">100% Gratuit</h3>
                    <p className="text-sm text-muted-foreground">
                      Notre newsletter est entièrement gratuite et vous pouvez vous désabonner à tout moment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-primary rounded-lg p-8 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold mb-6">Nos abonnés économisent en moyenne</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">25%</div>
              <div className="text-sm opacity-90">sur leurs achats</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3h</div>
              <div className="text-sm opacity-90">de recherche par semaine</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">de satisfaction</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Newsletter;