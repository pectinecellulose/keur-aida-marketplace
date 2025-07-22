import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>
          <Card>
            <CardHeader>
              <CardTitle>Protection de vos données personnelles</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-muted-foreground mb-4">Dernière mise à jour : 22 juillet 2025</p>
              
              <h3 className="text-lg font-semibold mb-2">1. Collecte des données</h3>
              <p className="mb-4">Nous collectons les données nécessaires au fonctionnement de notre service : email, nom, téléphone, adresse.</p>
              
              <h3 className="text-lg font-semibold mb-2">2. Utilisation des données</h3>
              <p className="mb-4">Vos données sont utilisées pour traiter vos commandes, améliorer nos services et vous contacter si nécessaire.</p>
              
              <h3 className="text-lg font-semibold mb-2">3. Partage des données</h3>
              <p className="mb-4">Nous ne vendons pas vos données. Elles peuvent être partagées avec nos partenaires logistiques pour la livraison.</p>
              
              <h3 className="text-lg font-semibold mb-2">4. Sécurité</h3>
              <p className="mb-4">Nous utilisons des mesures de sécurité avancées pour protéger vos données personnelles.</p>
              
              <h3 className="text-lg font-semibold mb-2">5. Vos droits</h3>
              <p className="mb-4">Vous pouvez accéder, modifier ou supprimer vos données en nous contactant à privacy@keuraida.com.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}