import { useState, useEffect } from "react"
import { TrendingUp, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"

interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  ads_count?: number;
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, emoji')
        .eq('is_active', true)
        .order('display_order')
        .limit(6);

      if (error) throw error;

      // Fetch ads count for each category
      const categoriesWithCount = await Promise.all(
        (data || []).map(async (category) => {
          const { count } = await supabase
            .from('ads')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id)
            .eq('status', 'active');
          
          return {
            ...category,
            ads_count: count || 0
          };
        })
      );

      setCategories(categoriesWithCount);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Chargement des catégories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Catégories populaires</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trouvez ce que vous
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              cherchez facilement
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des milliers d'annonces dans toutes les catégories. 
            Découvrez les offres les plus récentes et les meilleures affaires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <Card 
              key={category.id}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => window.location.href = `/category/${category.slug}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                    <span className="text-4xl">{category.emoji}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {new Intl.NumberFormat('fr-FR').format(category.ads_count || 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">annonces</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  Découvrez notre sélection de produits et services de qualité
                </p>

                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-primary hover:bg-primary/10 p-0 h-auto font-medium"
                >
                  Explorer cette catégorie
                  <Zap className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => window.location.href = '/all-products'}
          >
            Voir toutes les catégories
          </Button>
        </div>
      </div>
    </section>
  )
}