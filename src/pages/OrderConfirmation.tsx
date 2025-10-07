import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Package } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function OrderConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti or celebration animation could be added here
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-6">
                <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Commande confirmée !
              </h1>
              <p className="text-muted-foreground">
                Merci pour votre commande. Nous avons bien reçu votre demande.
              </p>
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Package className="w-6 h-6 text-primary mt-1" />
                  <div className="text-left space-y-1">
                    <h3 className="font-semibold">Prochaines étapes</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Vous recevrez un email de confirmation</li>
                      <li>• Le vendeur vous contactera sous peu</li>
                      <li>• Votre commande sera préparée et expédiée</li>
                      <li>• Vous serez notifié de l'avancement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4 space-y-3">
              <Button 
                onClick={() => navigate('/')} 
                size="lg" 
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')} 
                variant="outline" 
                size="lg" 
                className="w-full"
              >
                Voir mes commandes
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Besoin d'aide ? Contactez-nous au{' '}
                <a 
                  href="tel:+221775263847" 
                  className="text-primary hover:underline font-medium"
                >
                  77 526 38 47
                </a>
                {' '}ou par{' '}
                <a 
                  href="mailto:contact@keuraida.com" 
                  className="text-primary hover:underline font-medium"
                >
                  email
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
