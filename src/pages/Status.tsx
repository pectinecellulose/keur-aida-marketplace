import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

const Status = () => {
  const services = [
    {
      name: "Site Web",
      status: "operational",
      uptime: "99.9%",
      description: "Le site web principal fonctionne normalement"
    },
    {
      name: "API",
      status: "operational", 
      uptime: "99.8%",
      description: "L'API fonctionne normalement"
    },
    {
      name: "Base de données",
      status: "operational",
      uptime: "99.9%",
      description: "La base de données fonctionne normalement"
    },
    {
      name: "Messagerie",
      status: "maintenance",
      uptime: "98.5%",
      description: "Maintenance programmée en cours"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "maintenance":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "incident":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Opérationnel</Badge>
      case "maintenance":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
      case "incident":
        return <Badge variant="destructive">Incident</Badge>
      default:
        return <Badge variant="secondary">Inconnu</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Statut des Services KeurAida
              </CardTitle>
              <p className="text-muted-foreground">
                Tous les systèmes sont opérationnels
              </p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(service.status)}
                      <p className="text-sm text-muted-foreground mt-1">
                        Uptime: {service.uptime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Incidents récents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aucun incident signalé au cours des 30 derniers jours.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance programmée</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="font-semibold">Maintenance du système de messagerie</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Prévue le 30 janvier 2025 de 02:00 à 04:00 GMT
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Status