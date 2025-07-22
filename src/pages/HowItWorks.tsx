import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, PlusCircle, MessageCircle, CreditCard, Truck, Shield } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Trouvez votre produit",
      description: "Parcourez nos catégories ou utilisez la recherche pour trouver ce que vous cherchez",
      badge: "Acheteur"
    },
    {
      icon: PlusCircle,
      title: "Publiez votre annonce",
      description: "Créez un compte et publiez votre annonce avec photos et description détaillée",
      badge: "Vendeur"
    },
    {
      icon: MessageCircle,
      title: "Communiquez",
      description: "Contactez directement les vendeurs via notre système de messagerie sécurisé",
      badge: "Échange"
    },
    {
      icon: CreditCard,
      title: "Payez en sécurité",
      description: "Choisissez parmi nos moyens de paiement sécurisés : Wave, Orange Money, carte bancaire",
      badge: "Paiement"
    },
    {
      icon: Truck,
      title: "Recevez votre commande",
      description: "Livraison à domicile ou retrait en point relais, suivez votre commande en temps réel",
      badge: "Livraison"
    },
    {
      icon: Shield,
      title: "Satisfaction garantie",
      description: "Notre service client vous accompagne pour toute question ou problème",
      badge: "Support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Comment ça marche ?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment acheter et vendre facilement sur KeurAida, 
            votre marketplace de confiance au Sénégal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">{step.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Pour les Acheteurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">1</div>
                <div>
                  <h4 className="font-medium">Créez votre compte</h4>
                  <p className="text-sm text-muted-foreground">Inscription gratuite en quelques clics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">2</div>
                <div>
                  <h4 className="font-medium">Recherchez et comparez</h4>
                  <p className="text-sm text-muted-foreground">Trouvez les meilleures offres près de chez vous</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">3</div>
                <div>
                  <h4 className="font-medium">Contactez le vendeur</h4>
                  <p className="text-sm text-muted-foreground">Posez vos questions via notre messagerie</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">4</div>
                <div>
                  <h4 className="font-medium">Achetez en confiance</h4>
                  <p className="text-sm text-muted-foreground">Paiement sécurisé et protection acheteur</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pour les Vendeurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">1</div>
                <div>
                  <h4 className="font-medium">Inscrivez-vous vendeur</h4>
                  <p className="text-sm text-muted-foreground">Profil vendeur avec notation et avis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">2</div>
                <div>
                  <h4 className="font-medium">Publiez vos annonces</h4>
                  <p className="text-sm text-muted-foreground">Photos, description, prix - tout est simple</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">3</div>
                <div>
                  <h4 className="font-medium">Gérez vos ventes</h4>
                  <p className="text-sm text-muted-foreground">Tableau de bord complet avec statistiques</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">4</div>
                <div>
                  <h4 className="font-medium">Encaissez rapidement</h4>
                  <p className="text-sm text-muted-foreground">Paiements sécurisés et rapides</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
            <p className="text-muted-foreground mb-6">
              Rejoignez des milliers d'utilisateurs qui font confiance à KeurAida
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors">
                Créer un compte
              </a>
              <a href="/post-ad" className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors">
                Publier une annonce
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}