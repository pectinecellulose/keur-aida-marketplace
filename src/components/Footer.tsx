import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  marketplace: [
    { name: "Comment ça marche", href: "/how-it-works" },
    { name: "Publier une annonce", href: "/post-ad" },
    { name: "Sécurité", href: "/security" },
    { name: "Conseils vendeurs", href: "/seller-tips" },
  ],
  categories: [
    { name: "Téléphones & Tablettes", href: "/category/phones" },
    { name: "Véhicules", href: "/category/vehicles" },
    { name: "Immobilier", href: "/category/real-estate" },
    { name: "Emploi & Services", href: "/category/jobs" },
  ],
  support: [
    { name: "Centre d'aide", href: "/help" },
    { name: "Nous contacter", href: "/contact" },
    { name: "Signaler un problème", href: "/report" },
    { name: "Statut du service", href: "/status" },
  ],
  legal: [
    { name: "Conditions d'utilisation", href: "/terms" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
    { name: "Mentions légales", href: "/legal" },
  ]
}

export function Footer() {
  return (
    <footer className="bg-surface border-t">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Restez informé des meilleures offres
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Recevez nos newsletters avec les dernières annonces et offres exclusives
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Votre adresse email"
                className="flex-1 h-12 bg-background border-border"
              />
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground px-8">
                S'abonner
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground font-bold text-xl">
                  K
                </div>
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  KeurAida
                </span>
              </div>
              
              <p className="text-muted-foreground mb-6 max-w-sm">
                Votre marketplace de confiance pour acheter, vendre et découvrir 
                les meilleures offres au Sénégal et en Afrique de l'Ouest.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-4 h-4 mr-3 text-primary" />
                  <span>+221 78 508 72 37</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-3 text-primary" />
                  <span>cbteranga@gmail.com</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-3 text-primary" />
                  <span>Dakar, Sénégal</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary">
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Marketplace</h4>
              <ul className="space-y-3">
                {footerLinks.marketplace.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Catégories</h4>
              <ul className="space-y-3">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Légal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © 2024 KeurAida. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Disponible en:</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-xs">🇫🇷 Français</Button>
                <Button variant="ghost" size="sm" className="text-xs">🇬🇧 English</Button>
                <Button variant="ghost" size="sm" className="text-xs">🇸🇳 Wolof</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}