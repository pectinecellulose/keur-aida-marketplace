import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Conditions d'utilisation</h1>
          <Card>
            <CardHeader>
              <CardTitle>Conditions générales d'utilisation de KeurAida</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-muted-foreground mb-4">Dernière mise à jour : 22 juillet 2025</p>
              
              <h3 className="text-lg font-semibold mb-2">1. Acceptation des conditions</h3>
              <p className="mb-4">En utilisant KeurAida, vous acceptez ces conditions d'utilisation.</p>
              
              <h3 className="text-lg font-semibold mb-2">2. Description du service</h3>
              <p className="mb-4">KeurAida est une plateforme de marketplace permettant l'achat et la vente de produits et services.</p>
              
              <h3 className="text-lg font-semibold mb-2">3. Compte utilisateur</h3>
              <p className="mb-4">Vous devez créer un compte pour utiliser certaines fonctionnalités. Vous êtes responsable de la sécurité de votre compte.</p>
              
              <h3 className="text-lg font-semibold mb-2">4. Règles de conduite</h3>
              <p className="mb-4">Il est interdit de publier du contenu illégal, trompeur ou offensant sur notre plateforme.</p>
              
              <h3 className="text-lg font-semibold mb-2">5. Paiements et remboursements</h3>
              <p className="mb-4">Les transactions sont sécurisées. Les conditions de remboursement dépendent du vendeur.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}