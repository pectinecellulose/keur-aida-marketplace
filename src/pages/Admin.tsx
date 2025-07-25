import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, Users, ShoppingBag, TrendingUp, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';

interface Stats {
  total_ads: number;
  active_ads: number;
  total_users: number;
  total_categories: number;
}

interface Ad {
  id: string;
  title: string;
  price: number;
  currency: string;
  status: string;
  created_at: string;
  city: string;
  views_count: number;
}

export default function Admin() {
  const [stats, setStats] = useState<Stats>({ total_ads: 0, active_ads: 0, total_users: 0, total_categories: 0 });
  const [recentAds, setRecentAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Charger les statistiques
      const [adsResult, usersResult, categoriesResult, recentAdsResult] = await Promise.all([
        supabase.from('ads').select('status', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('categories').select('id', { count: 'exact' }),
        supabase.from('ads').select('*').order('created_at', { ascending: false }).limit(10)
      ]);

      const totalAds = adsResult.count || 0;
      const activeAds = adsResult.data?.filter(ad => ad.status === 'active').length || 0;

      setStats({
        total_ads: totalAds,
        active_ads: activeAds,
        total_users: usersResult.count || 0,
        total_categories: categoriesResult.count || 0
      });

      setRecentAds(recentAdsResult.data || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du tableau de bord.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAdStatus = async (adId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('ads')
        .update({ status })
        .eq('id', adId);

      if (error) throw error;

      toast({
        title: "Statut mis à jour",
        description: `L'annonce a été ${status === 'active' ? 'activée' : 'désactivée'}.`,
      });

      loadDashboardData(); // Recharger les données
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de l'annonce.",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + currency;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Accès non autorisé</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Chargement du tableau de bord...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Tableau de bord administrateur</h1>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Annonces</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_ads}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.active_ads} actives
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_users}</div>
                <p className="text-xs text-muted-foreground">
                  Profils créés
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Catégories</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_categories}</div>
                <p className="text-xs text-muted-foreground">
                  Catégories actives
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vues totales</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recentAds.reduce((sum, ad) => sum + (ad.views_count || 0), 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sur les 10 dernières annonces
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Informations du site */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Informations du site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Téléphone & WhatsApp</p>
                  <p className="text-lg font-semibold">785973747</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold">cbteranga@gmail.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nom du site</p>
                  <p className="text-lg font-semibold">KeurAida</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dernières annonces */}
          <Card>
            <CardHeader>
              <CardTitle>Dernières annonces</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAds.map((ad) => (
                  <div key={ad.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{ad.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{formatPrice(ad.price, ad.currency)}</span>
                        <span>{ad.city}</span>
                        <span>{ad.views_count || 0} vues</span>
                        <span>{new Date(ad.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(ad.status)}>
                        {ad.status === 'active' ? 'Active' : ad.status === 'pending' ? 'En attente' : 'Rejetée'}
                      </Badge>
                      <div className="flex gap-1">
                        {ad.status !== 'active' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAdStatus(ad.id, 'active')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {ad.status === 'active' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAdStatus(ad.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.location.href = `/product/${ad.id}`}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}