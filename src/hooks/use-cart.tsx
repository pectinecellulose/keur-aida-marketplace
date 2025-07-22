import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-auth';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  ad_id: string;
  quantity: number;
  price: number;
  title: string;
  images: string[];
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (adId: string) => Promise<void>;
  removeFromCart: (adId: string) => Promise<void>;
  updateQuantity: (adId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Load cart from localStorage for guests or fetch from database for users
  useEffect(() => {
    if (user) {
      // TODO: Fetch cart from database when implementing cart persistence
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } else {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    }
  }, [user]);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (adId: string) => {
    setIsLoading(true);
    try {
      // Fetch ad details
      const { data: ad, error } = await supabase
        .from('ads')
        .select('id, title, price, images')
        .eq('id', adId)
        .single();

      if (error) throw error;

      const existingItem = items.find(item => item.ad_id === adId);
      
      if (existingItem) {
        setItems(prev => prev.map(item => 
          item.ad_id === adId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        const newItem: CartItem = {
          id: crypto.randomUUID(),
          ad_id: adId,
          quantity: 1,
          price: ad.price || 0,
          title: ad.title,
          images: ad.images || []
        };
        setItems(prev => [...prev, newItem]);
      }

      toast({
        title: "Produit ajouté au panier",
        description: `${ad.title} a été ajouté à votre panier.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (adId: string) => {
    setItems(prev => prev.filter(item => item.ad_id !== adId));
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier.",
    });
  };

  const updateQuantity = async (adId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(adId);
      return;
    }

    setItems(prev => prev.map(item => 
      item.ad_id === adId 
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = async () => {
    setItems([]);
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés de votre panier.",
    });
  };

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}