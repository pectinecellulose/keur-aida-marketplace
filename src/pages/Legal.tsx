import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Mentions Légales</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2>Éditeur du site</h2>
            <p>
              KeurAida<br />
              Société par actions simplifiée<br />
              Capital social : 10 000 €<br />
              Siège social : Dakar, Sénégal<br />
              RCS : [À compléter]<br />
              SIRET : [À compléter]<br />
              TVA intracommunautaire : [À compléter]
            </p>

            <h2>Directeur de la publication</h2>
            <p>[Nom du directeur de publication]</p>

            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par :<br />
              [Nom de l'hébergeur]<br />
              [Adresse de l'hébergeur]
            </p>

            <h2>Contact</h2>
            <p>
              Email : contact@keuraida.com<br />
              Téléphone : +221 XX XX XX XX
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation sénégalaise et internationale 
              sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
              reproduction sont réservés, y compris pour les documents téléchargeables 
              et les représentations iconographiques et photographiques.
            </p>

            <h2>Responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont aussi précises que possible 
              et le site remis à jour à différentes périodes de l'année, mais peut 
              toutefois contenir des inexactitudes ou des omissions.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default Legal