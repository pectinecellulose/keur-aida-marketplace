import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nous contacter</h1>
            <p className="text-xl text-muted-foreground">
              Une question ? Un problème ? Notre équipe est là pour vous aider
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">Support général</p>
                  <a href="mailto:support@keuraida.com" className="text-primary hover:underline">
                    support@keuraida.com
                  </a>
                  <p className="text-muted-foreground mb-2 mt-4">Sécurité</p>
                  <a href="mailto:security@keuraida.com" className="text-primary hover:underline">
                    security@keuraida.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">Support client</p>
                  <a href="tel:+221771234567" className="text-primary hover:underline font-medium">
                    +221 77 123 45 67
                  </a>
                  <p className="text-muted-foreground mb-2 mt-4">Urgences sécurité</p>
                  <a href="tel:+221781234567" className="text-primary hover:underline font-medium">
                    +221 78 123 45 67
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Adresse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    KeurAida Marketplace<br />
                    Zone de Captage<br />
                    Cité Keur Gorgui<br />
                    Dakar, Sénégal
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Horaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span>8h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span>9h00 - 15h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span>Fermé</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-green-600 font-medium">
                        📞 Support téléphonique 24h/24
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input id="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" type="tel" />
                    </div>

                    <div>
                      <Label htmlFor="subject">Sujet *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Question générale</SelectItem>
                          <SelectItem value="account">Problème de compte</SelectItem>
                          <SelectItem value="payment">Problème de paiement</SelectItem>
                          <SelectItem value="delivery">Problème de livraison</SelectItem>
                          <SelectItem value="security">Problème de sécurité</SelectItem>
                          <SelectItem value="technical">Problème technique</SelectItem>
                          <SelectItem value="suggestion">Suggestion d'amélioration</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Décrivez votre problème ou votre question en détail..."
                        rows={6}
                        required 
                      />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      * Champs obligatoires. Nous nous engageons à répondre sous 24h.
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                      {isLoading ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Help */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Besoin d'aide immédiate ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Centre d'aide</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Consultez notre FAQ
                      </p>
                      <a href="/help" className="text-primary hover:underline text-sm">
                        Voir les questions fréquentes →
                      </a>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Chat en direct</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Assistance instantanée
                      </p>
                      <button className="text-primary hover:underline text-sm">
                        Démarrer une conversation →
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}