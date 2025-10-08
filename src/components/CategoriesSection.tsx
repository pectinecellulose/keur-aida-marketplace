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
        .order('display_order');

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
    <section className="py-12 bg-surface">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Toutes les catégories
            </h2>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary hover:bg-primary/10"
            onClick={() => window.location.href = '/all-products'}
          >
            Tout voir
            <Zap className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className="group cursor-pointer flex-shrink-0 w-[160px] border hover:border-primary/50 transition-all duration-300 hover:shadow-lg snap-start"
                onClick={() => window.location.href = `/category/${category.slug}`}
              >
                <CardContent className="p-4 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                      <span className="text-3xl">{category.emoji}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground">
                    {new Intl.NumberFormat('fr-FR').format(category.ads_count || 0)} annonces
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}