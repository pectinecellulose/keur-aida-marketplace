import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Politique des Cookies</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2>Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre ordinateur, 
              tablette ou smartphone lorsque vous visitez notre site web. 
              Il nous permet de reconnaître votre appareil et de stocker 
              certaines informations sur vos préférences ou actions passées.
            </p>

            <h2>Types de cookies utilisés</h2>
            
            <h3>Cookies essentiels</h3>
            <p>
              Ces cookies sont nécessaires au fonctionnement du site. 
              Ils incluent, par exemple, les cookies qui vous permettent 
              de vous connecter à des zones sécurisées de notre site web.
            </p>

            <h3>Cookies de performance</h3>
            <p>
              Ces cookies nous permettent de reconnaître et de compter 
              le nombre de visiteurs et de voir comment les visiteurs 
              se déplacent sur notre site web.
            </p>

            <h3>Cookies de fonctionnalité</h3>
            <p>
              Ces cookies sont utilisés pour vous reconnaître lorsque 
              vous revenez sur notre site web. Cela nous permet de 
              personnaliser notre contenu pour vous.
            </p>

            <h2>Gestion des cookies</h2>
            <p>
              Vous pouvez contrôler et/ou supprimer les cookies comme 
              vous le souhaitez. Vous pouvez supprimer tous les cookies 
              qui sont déjà sur votre ordinateur et vous pouvez configurer 
              la plupart des navigateurs pour empêcher qu'ils soient placés.
            </p>

            <h2>Contact</h2>
            <p>
              Si vous avez des questions concernant notre politique 
              des cookies, veuillez nous contacter à : cbteranga@gmail.com
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default Cookies