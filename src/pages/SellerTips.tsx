import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Star, MessageCircle, TrendingUp, Clock, Users } from 'lucide-react';

export default function SellerTips() {
  const tips = [
    {
      icon: Camera,
      title: "Photos de qualité",
      description: "Prenez des photos nettes, bien éclairées et sous plusieurs angles",
      level: "Essentiel",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Star,
      title: "Description détaillée",
      description: "Décrivez précisément l'état, les caractéristiques et l'historique du produit",
      level: "Important",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: MessageCircle,
      title: "Répondez rapidement",
      description: "Réagissez vite aux messages pour ne pas perdre d'acheteurs potentiels",
      level: "Recommandé",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Prix compétitif",
      description: "Étudiez les prix du marché et positionnez-vous intelligemment",
      level: "Important",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Clock,
      title: "Timing optimal",
      description: "Publiez vos annonces en fin de semaine et en soirée",
      level: "Astuce",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "Construisez votre réputation",
      description: "Soignez vos échanges pour obtenir de bons avis",
      level: "Essentiel",
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Conseils pour bien vendre</h1>
            <p className="text-xl text-muted-foreground">
              Maximisez vos chances de vendre rapidement et au meilleur prix
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {tips.map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <tip.icon className="w-8 h-8 text-primary" />
                    <Badge className={tip.color}>{tip.level}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>📸 Guide photo parfaite</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">✅ À faire</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Utilisez la lumière naturelle</li>
                      <li>• Nettoyez le produit avant</li>
                      <li>• Prenez 5-8 photos minimum</li>
                      <li>• Montrez les défauts s'il y en a</li>
                      <li>• Utilisez un fond neutre</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600 mb-2">❌ À éviter</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Photos floues ou sombres</li>
                      <li>• Une seule photo</li>
                      <li>• Arrière-plan encombré</li>
                      <li>• Photos trop retouchées</li>
                      <li>• Cacher des défauts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💰 Stratégies de prix</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Prix élevé</h4>
                    <p className="text-sm text-muted-foreground">Produits rares ou très demandés</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-medium mb-2">Prix du marché</h4>
                    <p className="text-sm text-muted-foreground">Stratégie recommandée</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Prix attractif</h4>
                    <p className="text-sm text-muted-foreground">Vente rapide souhaitée</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Astuce pro</h4>
                  <p className="text-sm text-muted-foreground">
                    Fixez un prix légèrement au-dessus de votre minimum acceptable, 
                    puis mentionnez "prix négociable" pour attirer plus d'acheteurs.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⭐ Construire sa réputation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">1</div>
                    <div>
                      <h4 className="font-medium">Soyez honnête</h4>
                      <p className="text-sm text-muted-foreground">Décrivez fidèlement l'état et les caractéristiques</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">2</div>
                    <div>
                      <h4 className="font-medium">Communiquez bien</h4>
                      <p className="text-sm text-muted-foreground">Réponses rapides et courtoises</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">3</div>
                    <div>
                      <h4 className="font-medium">Livrez comme promis</h4>
                      <p className="text-sm text-muted-foreground">Respectez les délais et conditions annoncés</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full text-white text-sm flex items-center justify-center font-bold mt-0.5">4</div>
                    <div>
                      <h4 className="font-medium">Demandez des avis</h4>
                      <p className="text-sm text-muted-foreground">Incitez poliment vos acheteurs à laisser un commentaire</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📊 Optimiser ses annonces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Titre accrocheur</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-green-50 border border-green-200 rounded">
                        <span className="text-green-600 font-medium">✅ Bon :</span> "iPhone 14 Pro Max 256GB Bleu, état neuf avec boîte"
                      </div>
                      <div className="p-2 bg-red-50 border border-red-200 rounded">
                        <span className="text-red-600 font-medium">❌ Mauvais :</span> "téléphone à vendre"
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Mots-clés importants</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Marque et modèle exact</li>
                      <li>• État (neuf, comme neuf, bon...)</li>
                      <li>• Caractéristiques principales</li>
                      <li>• Accessoires inclus</li>
                      <li>• Urgence si nécessaire</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}