import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, MapPin, DollarSign, Camera } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  emoji?: string;
  parent_id?: string;
  display_order?: number;
}

interface CategoryField {
  name: string;
  type: 'text' | 'number' | 'select';
  required: boolean;
  options?: string[];
}

export default function PostAd() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryFields, setCategoryFields] = useState<CategoryField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadCategories();
  }, [user, navigate]);

  const loadCategories = async () => {
    try {
      // Charger toutes les catégories et sous-catégories avec optimisation
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, emoji, parent_id, display_order')
        .eq('is_active', true)
        .order('parent_id, display_order, name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const getCategoryFields = (categoryId: string): CategoryField[] => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return [];

    // Champs spécifiques selon la catégorie
    const commonFields: CategoryField[] = [
      { name: 'brand', type: 'text', required: false },
      { name: 'model', type: 'text', required: false }
    ];

    switch (category.slug) {
      case 'automobiles':
        return [
          ...commonFields,
          { name: 'year', type: 'number', required: true },
          { name: 'mileage', type: 'number', required: true },
          { name: 'fuel_type', type: 'select', required: true, options: ['Essence', 'Diesel', 'Électrique', 'Hybride'] },
          { name: 'transmission', type: 'select', required: true, options: ['Manuelle', 'Automatique'] }
        ];
      case 'immobilier':
        return [
          { name: 'surface', type: 'number', required: true },
          { name: 'rooms', type: 'number', required: true },
          { name: 'property_type', type: 'select', required: true, options: ['Appartement', 'Maison', 'Studio', 'Villa'] }
        ];
      case 'electronique':
        return [
          ...commonFields,
          { name: 'warranty', type: 'select', required: false, options: ['Sous garantie', 'Hors garantie'] },
          { name: 'storage', type: 'text', required: false }
        ];
      case 'vetements':
        return [
          { name: 'size', type: 'select', required: true, options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
          { name: 'color', type: 'text', required: true },
          { name: 'material', type: 'text', required: false }
        ];
      default:
        return commonFields;
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCategoryFields(getCategoryFields(categoryId));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase
        .from('ads')
        .insert({
          user_id: user.id,
          category_id: formData.get('category') as string,
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          price: parseFloat(formData.get('price') as string),
          currency: 'XOF',
          condition: formData.get('condition') as string,
          location: formData.get('location') as string,
          city: formData.get('city') as string,
          contact_phone: formData.get('phone') as string,
          contact_email: formData.get('email') as string,
          is_negotiable: formData.get('negotiable') === 'on',
          images: images,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Annonce publiée !",
        description: "Votre annonce a été publiée avec succès.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de publier l'annonce.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Simulate image upload - in real app, upload to storage
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Publier une annonce</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Photos (Jusqu'à 10 photos)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                      <img src={image} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  {images.length < 10 && (
                    <div className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                      <label className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Ajouter</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de base</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre de l'annonce *</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="Ex: iPhone 14 Pro Max 256GB comme neuf"
                    required 
                  />
                </div>

                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select name="category" required onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                     <SelectContent>
                       {categories
                         .filter(c => !c.parent_id)
                         .map((parentCategory) => [
                           <SelectItem key={parentCategory.id} value={parentCategory.id}>
                             {parentCategory.emoji || '📁'} {parentCategory.name}
                           </SelectItem>,
                           ...categories
                             .filter(subCategory => subCategory.parent_id === parentCategory.id)
                             .map((subCategory) => (
                               <SelectItem key={subCategory.id} value={subCategory.id}>
                                 ├─ {subCategory.emoji || '📄'} {subCategory.name}
                               </SelectItem>
                             ))
                         ])
                         .flat()}
                     </SelectContent>
                  </Select>
                </div>

                {/* Champs spécifiques à la catégorie */}
                {categoryFields.map((field) => (
                  <div key={field.name}>
                    <Label htmlFor={field.name}>
                      {field.name.charAt(0).toUpperCase() + field.name.slice(1).replace('_', ' ')}
                      {field.required && ' *'}
                    </Label>
                    {field.type === 'select' ? (
                      <Select name={field.name} required={field.required}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Choisir ${field.name}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input 
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        placeholder={`Entrer ${field.name}`}
                      />
                    )}
                  </div>
                ))}

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Décrivez votre produit en détail..."
                    rows={5}
                    required 
                  />
                </div>

                <div>
                  <Label htmlFor="condition">État</Label>
                  <Select name="condition">
                    <SelectTrigger>
                      <SelectValue placeholder="État du produit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Neuf</SelectItem>
                      <SelectItem value="like-new">Comme neuf</SelectItem>
                      <SelectItem value="good">Bon état</SelectItem>
                      <SelectItem value="fair">État correct</SelectItem>
                      <SelectItem value="poor">Mauvais état</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Price */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Prix
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="price">Prix (FCFA) *</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number" 
                    placeholder="Ex: 50000"
                    required 
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="negotiable" name="negotiable" />
                  <Label htmlFor="negotiable">Prix négociable</Label>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Localisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      placeholder="Ex: Dakar"
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Quartier/Zone *</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      placeholder="Ex: Plateau, Almadies"
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel"
                      placeholder="Ex: 77 123 45 67"
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      defaultValue={user.email || ''}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" size="lg" disabled={isLoading} className="flex-1">
                {isLoading ? "Publication..." : "Publier l'annonce"}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}