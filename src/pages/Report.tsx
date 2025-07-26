import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const Report = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    description: '',
    url: '',
    email: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simuler l'envoi du rapport
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Rapport envoyé",
        description: "Votre signalement a été envoyé avec succès. Nous examinerons votre demande dans les plus brefs délais."
      })

      setFormData({
        type: '',
        subject: '',
        description: '',
        url: '',
        email: ''
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le rapport. Veuillez réessayer.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Signaler un problème</CardTitle>
            <p className="text-muted-foreground">
              Signalez un contenu inapproprié, un bug ou tout autre problème
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type">Type de signalement</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir le type de problème" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inappropriate-content">Contenu inapproprié</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="fake-ad">Annonce frauduleuse</SelectItem>
                    <SelectItem value="bug">Bug technique</SelectItem>
                    <SelectItem value="harassment">Harcèlement</SelectItem>
                    <SelectItem value="copyright">Violation de droits d'auteur</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Votre email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL de la page concernée (optionnel)</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://keuraida.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Résumé du problème"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Décrivez le problème en détail..."
                  rows={6}
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading || !formData.type || !formData.subject || !formData.description || !formData.email}
                className="w-full"
              >
                {loading ? "Envoi en cours..." : "Envoyer le signalement"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Informations importantes</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Nous examinons tous les signalements dans les 24-48 heures</li>
                <li>• Les signalements abusifs peuvent entraîner des sanctions</li>
                <li>• Vos informations personnelles restent confidentielles</li>
                <li>• Pour les urgences, contactez-nous directement au +221 XX XX XX XX</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default Report