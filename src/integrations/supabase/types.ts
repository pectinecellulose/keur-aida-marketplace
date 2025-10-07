export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ads: {
        Row: {
          category_id: string
          city: string
          condition: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          currency: string | null
          description: string
          expires_at: string | null
          id: string
          images: string[] | null
          is_admin_product: boolean | null
          is_featured: boolean | null
          is_negotiable: boolean | null
          is_urgent: boolean | null
          location: string
          price: number | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          views_count: number | null
        }
        Insert: {
          category_id: string
          city: string
          condition?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          currency?: string | null
          description: string
          expires_at?: string | null
          id?: string
          images?: string[] | null
          is_admin_product?: boolean | null
          is_featured?: boolean | null
          is_negotiable?: boolean | null
          is_urgent?: boolean | null
          location: string
          price?: number | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          views_count?: number | null
        }
        Update: {
          category_id?: string
          city?: string
          condition?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          currency?: string | null
          description?: string
          expires_at?: string | null
          id?: string
          images?: string[] | null
          is_admin_product?: boolean | null
          is_featured?: boolean | null
          is_negotiable?: boolean | null
          is_urgent?: boolean | null
          location?: string
          price?: number | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          action_type: string
          action_value: string | null
          created_at: string
          id: string
          is_enabled: boolean | null
          name: string
          trigger_type: string
          trigger_value: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          action_type: string
          action_value?: string | null
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          name: string
          trigger_type: string
          trigger_value?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          action_type?: string
          action_value?: string | null
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          name?: string
          trigger_type?: string
          trigger_value?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          display_order: number | null
          emoji: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          emoji?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          emoji?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          ad_id: string
          buyer_id: string
          created_at: string
          id: string
          is_archived: boolean | null
          last_message_at: string | null
          seller_id: string
        }
        Insert: {
          ad_id: string
          buyer_id: string
          created_at?: string
          id?: string
          is_archived?: boolean | null
          last_message_at?: string | null
          seller_id: string
        }
        Update: {
          ad_id?: string
          buyer_id?: string
          created_at?: string
          id?: string
          is_archived?: boolean | null
          last_message_at?: string | null
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      emails: {
        Row: {
          body_html: string | null
          body_text: string | null
          category: string | null
          created_at: string
          from_email: string
          from_name: string | null
          gmail_id: string
          id: string
          is_read: boolean | null
          is_starred: boolean | null
          labels: string[] | null
          priority: number | null
          received_at: string
          snippet: string | null
          status: string | null
          subject: string
          thread_id: string | null
          to_email: string
          updated_at: string
          user_id: string
        }
        Insert: {
          body_html?: string | null
          body_text?: string | null
          category?: string | null
          created_at?: string
          from_email: string
          from_name?: string | null
          gmail_id: string
          id?: string
          is_read?: boolean | null
          is_starred?: boolean | null
          labels?: string[] | null
          priority?: number | null
          received_at: string
          snippet?: string | null
          status?: string | null
          subject: string
          thread_id?: string | null
          to_email: string
          updated_at?: string
          user_id: string
        }
        Update: {
          body_html?: string | null
          body_text?: string | null
          category?: string | null
          created_at?: string
          from_email?: string
          from_name?: string | null
          gmail_id?: string
          id?: string
          is_read?: boolean | null
          is_starred?: boolean | null
          labels?: string[] | null
          priority?: number | null
          received_at?: string
          snippet?: string | null
          status?: string | null
          subject?: string
          thread_id?: string | null
          to_email?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          ad_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          ad_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          ad_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          message_type: string | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean | null
          is_sent: boolean | null
          message: string
          sent_via: string[] | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          is_sent?: boolean | null
          message: string
          sent_via?: string[] | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          is_sent?: boolean | null
          message?: string
          sent_via?: string[] | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          barcode: string | null
          category_id: string | null
          condition: Database["public"]["Enums"]["product_condition"] | null
          created_at: string
          current_stock: number | null
          description: string | null
          expiry_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          min_stock_level: number | null
          name: string
          purchase_price: number
          selling_price: number
          sku: string | null
          supplier_id: string | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          barcode?: string | null
          category_id?: string | null
          condition?: Database["public"]["Enums"]["product_condition"] | null
          created_at?: string
          current_stock?: number | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          min_stock_level?: number | null
          name: string
          purchase_price?: number
          selling_price?: number
          sku?: string | null
          supplier_id?: string | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          barcode?: string | null
          category_id?: string | null
          condition?: Database["public"]["Enums"]["product_condition"] | null
          created_at?: string
          current_stock?: number | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          min_stock_level?: number | null
          name?: string
          purchase_price?: number
          selling_price?: number
          sku?: string | null
          supplier_id?: string | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_products_supplier"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          phone: string | null
          seller_rating: number | null
          total_sales: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          seller_rating?: number | null
          total_sales?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          seller_rating?: number | null
          total_sales?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      purchase_order_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          purchase_order_id: string
          quantity_ordered: number
          quantity_received: number | null
          total_cost: number
          unit_cost: number
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          purchase_order_id: string
          quantity_ordered: number
          quantity_received?: number | null
          total_cost: number
          unit_cost: number
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          purchase_order_id?: string
          quantity_ordered?: number
          quantity_received?: number | null
          total_cost?: number
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          actual_delivery: string | null
          created_at: string
          created_by: string | null
          expected_delivery: string | null
          id: string
          notes: string | null
          order_date: string
          order_number: string
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number | null
          supplier_id: string
          tax_amount: number | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          actual_delivery?: string | null
          created_at?: string
          created_by?: string | null
          expected_delivery?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          order_number: string
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number | null
          supplier_id: string
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          actual_delivery?: string | null
          created_at?: string
          created_by?: string | null
          expected_delivery?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          order_number?: string
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number | null
          supplier_id?: string
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      report_cache: {
        Row: {
          created_at: string
          data: Json
          id: string
          report_date: string
          report_type: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          report_date: string
          report_type: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          report_date?: string
          report_type?: string
        }
        Relationships: []
      }
      sale_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          sale_id: string
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity: number
          sale_id: string
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          sale_id?: string
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          cashier_id: string | null
          created_at: string
          customer_name: string | null
          customer_phone: string | null
          discount_amount: number | null
          id: string
          notes: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_reference: string | null
          sale_number: string
          subtotal: number
          tax_amount: number | null
          total_amount: number
        }
        Insert: {
          cashier_id?: string | null
          created_at?: string
          customer_name?: string | null
          customer_phone?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_reference?: string | null
          sale_number: string
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
        }
        Update: {
          cashier_id?: string | null
          created_at?: string
          customer_name?: string | null
          customer_phone?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_reference?: string | null
          sale_number?: string
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
        }
        Relationships: []
      }
      stock_movements: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          movement_type: Database["public"]["Enums"]["stock_movement_type"]
          new_stock: number
          notes: string | null
          previous_stock: number
          product_id: string
          quantity: number
          reference_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          movement_type: Database["public"]["Enums"]["stock_movement_type"]
          new_stock: number
          notes?: string | null
          previous_stock: number
          product_id: string
          quantity: number
          reference_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          movement_type?: Database["public"]["Enums"]["stock_movement_type"]
          new_stock?: number
          notes?: string | null
          previous_stock?: number
          product_id?: string
          quantity?: number
          reference_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          city: string | null
          contact_person: string | null
          country: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          payment_terms: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          contact_person?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          payment_terms?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          contact_person?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          payment_terms?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_gmail_tokens: {
        Row: {
          access_token: string
          created_at: string
          email_address: string | null
          expires_at: string | null
          id: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string
          email_address?: string | null
          expires_at?: string | null
          id?: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string
          email_address?: string | null
          expires_at?: string | null
          id?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          permissions: Json | null
          role: Database["public"]["Enums"]["user_role_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["user_role_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["user_role_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_po_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_sale_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      increment_ad_views: {
        Args: { ad_uuid: string }
        Returns: undefined
      }
      update_product_stock: {
        Args: {
          movement_type: Database["public"]["Enums"]["stock_movement_type"]
          notes_text?: string
          product_uuid: string
          quantity_change: number
          reference_uuid?: string
          user_id?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      notification_type:
        | "low_stock"
        | "expired_product"
        | "daily_report"
        | "sale_alert"
      order_status: "pending" | "confirmed" | "delivered" | "cancelled"
      payment_method: "cash" | "card" | "mobile_money" | "credit"
      product_condition: "new" | "used" | "refurbished"
      stock_movement_type: "in" | "out" | "adjustment" | "transfer"
      transaction_type: "sale" | "purchase" | "adjustment" | "loss" | "return"
      user_role_type: "admin" | "manager" | "cashier" | "supervisor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      notification_type: [
        "low_stock",
        "expired_product",
        "daily_report",
        "sale_alert",
      ],
      order_status: ["pending", "confirmed", "delivered", "cancelled"],
      payment_method: ["cash", "card", "mobile_money", "credit"],
      product_condition: ["new", "used", "refurbished"],
      stock_movement_type: ["in", "out", "adjustment", "transfer"],
      transaction_type: ["sale", "purchase", "adjustment", "loss", "return"],
      user_role_type: ["admin", "manager", "cashier", "supervisor"],
    },
  },
} as const
