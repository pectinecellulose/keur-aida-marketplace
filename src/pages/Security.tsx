import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, UserCheck, AlertTriangle, Phone } from 'lucide-react';

export default function Security() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Sécurité sur KeurAida</h1>
            <p className="text-xl text-muted-foreground">
              Votre sécurité est notre priorité. Découvrez nos mesures de protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Transactions sécurisées</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tous les paiements sont protégés par des systèmes de cryptage avancés.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <UserCheck className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Vérification des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous vérifions l'identité de nos vendeurs pour garantir des échanges sûrs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Modération active</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Notre équipe surveille les annonces 24h/24 pour détecter les fraudes.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Conseils de sécurité pour les acheteurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 className="font-medium">Utilisez nos moyens de paiement sécurisés</h4>
                    <p className="text-sm text-muted-foreground">Préférez Wave, Orange Money ou notre système de paiement intégré</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 className="font-medium">Vérifiez le profil du vendeur</h4>
                    <p className="text-sm text-muted-foreground">Consultez les avis et la note du vendeur avant d'acheter</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 className="font-medium">Inspectez avant de payer</h4>
                    <p className="text-sm text-muted-foreground">Pour les achats en personne, vérifiez l'état du produit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 className="font-medium">Rencontrez-vous dans un lieu public</h4>
                    <p className="text-sm text-muted-foreground">Privilégiez les centres commerciaux ou lieux fréquentés</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conseils de sécurité pour les vendeurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 className="font-medium">Vérifiez l'identité de l'acheteur</h4>
                    <p className="text-sm text-muted-foreground">Demandez une pièce d'identité pour les gros montants</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 className="font-medium">Utilisez notre système de messagerie</h4>
                    <p className="text-sm text-muted-foreground">Gardez une trace écrite de tous vos échanges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 className="font-medium">Décrivez fidèlement vos produits</h4>
                    <p className="text-sm text-muted-foreground">Photos réelles et description honnête pour éviter les litiges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 className="font-medium">Méfiez-vous des paiements inhabituels</h4>
                    <p className="text-sm text-muted-foreground">Refusez les chèques ou virements douteux</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="w-5 h-5" />
                  Signaler un problème
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 mb-4">
                  Si vous suspectez une fraude ou rencontrez un problème, contactez-nous immédiatement :
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">Urgence : +221 77 123 45 67</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-700">
                    <span>Email : </span>
                    <a href="mailto:security@keuraida.com" className="underline">security@keuraida.com</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Protection des données
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Vos données personnelles sont protégées selon les standards internationaux :
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Cryptage SSL/TLS pour toutes les communications</li>
                  <li>• Stockage sécurisé de vos informations personnelles</li>
                  <li>• Accès limité aux données par notre équipe</li>
                  <li>• Conformité aux réglementations sur la protection des données</li>
                  <li>• Audit de sécurité régulier par des experts externes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}