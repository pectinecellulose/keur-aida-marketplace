import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, HelpCircle, MessageCircle, Package, CreditCard, Truck, Shield, Users } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: Package, title: "Acheter", description: "Comment passer commande", articles: 12 },
    { icon: CreditCard, title: "Paiement", description: "Moyens de paiement et sécurité", articles: 8 },
    { icon: Truck, title: "Livraison", description: "Suivi et modalités de livraison", articles: 6 },
    { icon: Users, title: "Vendre", description: "Publier et gérer ses annonces", articles: 15 },
    { icon: Shield, title: "Sécurité", description: "Protection et signalement", articles: 10 },
    { icon: MessageCircle, title: "Communication", description: "Messagerie et support", articles: 5 }
  ];

  const faqItems = [
    {
      category: "Général",
      question: "Comment créer un compte sur KeurAida ?",
      answer: "Cliquez sur 'Connexion' puis 'Créer un compte'. Vous pouvez vous inscrire avec votre email ou via Google/Facebook. Confirmez votre email pour activer votre compte."
    },
    {
      category: "Achat",
      question: "Comment passer une commande ?",
      answer: "Ajoutez les produits à votre panier, puis cliquez sur 'Passer la commande'. Remplissez vos informations de livraison et choisissez votre mode de paiement."
    },
    {
      category: "Paiement",
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons Wave, Orange Money, les cartes bancaires Visa/Mastercard, et le paiement à la livraison pour certaines zones."
    },
    {
      category: "Livraison",
      question: "Combien coûte la livraison ?",
      answer: "La livraison est gratuite pour toutes les commandes. Les délais varient de 24h à 72h selon votre localisation."
    },
    {
      category: "Vente",
      question: "Comment publier une annonce ?",
      answer: "Connectez-vous à votre compte, cliquez sur 'Publier une annonce', remplissez les informations et ajoutez des photos de qualité."
    },
    {
      category: "Vente",
      question: "Combien coûte la publication d'une annonce ?",
      answer: "La publication d'annonces est gratuite. Nous proposons des options payantes pour mettre en avant vos annonces."
    },
    {
      category: "Sécurité",
      question: "Comment signaler une annonce suspecte ?",
      answer: "Cliquez sur 'Signaler' sur la page de l'annonce ou contactez notre équipe à security@keuraida.com avec les détails."
    },
    {
      category: "Support",
      question: "Comment contacter le service client ?",
      answer: "Vous pouvez nous contacter par email à support@keuraida.com, par téléphone au +221 77 123 45 67, ou via notre chat en direct."
    }
  ];

  const filteredFAQ = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Centre d'aide</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Trouvez rapidement des réponses à vos questions
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <category.icon className="w-8 h-8 text-primary" />
                    <Badge variant="secondary">{category.articles} articles</Badge>
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Questions fréquentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
            <CardContent className="text-center py-12">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
              <p className="text-muted-foreground mb-6">
                Notre équipe support est là pour vous aider 24h/24 et 7j/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contacter le support
                </a>
                <a 
                  href="tel:+221771234567" 
                  className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Appeler : +221 77 123 45 67
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}