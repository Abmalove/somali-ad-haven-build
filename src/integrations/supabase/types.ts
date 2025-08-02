export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_approvals: {
        Row: {
          amount: number | null
          approval_type: string
          approved_at: string | null
          approved_by: string | null
          created_at: string
          id: string
          notes: string | null
          status: string
          subscription_duration: number | null
          subscription_expires_at: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          approval_type: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          subscription_duration?: number | null
          subscription_expires_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          approval_type?: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          subscription_duration?: number | null
          subscription_expires_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_admin_approvals_profiles"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ads: {
        Row: {
          boost_expires_at: string | null
          brand: string | null
          category: string
          condition: string | null
          created_at: string
          currency: string
          cv_url: string | null
          description: string
          experience: string | null
          id: string
          image_urls: string[] | null
          is_boosted: boolean | null
          is_hidden: boolean | null
          is_highlighted: boolean | null
          job_title: string | null
          model: string | null
          phone: string
          price: number
          region: string
          salary: string | null
          shop_name: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
          view_count: number | null
          year: string | null
        }
        Insert: {
          boost_expires_at?: string | null
          brand?: string | null
          category: string
          condition?: string | null
          created_at?: string
          currency?: string
          cv_url?: string | null
          description: string
          experience?: string | null
          id?: string
          image_urls?: string[] | null
          is_boosted?: boolean | null
          is_hidden?: boolean | null
          is_highlighted?: boolean | null
          job_title?: string | null
          model?: string | null
          phone: string
          price: number
          region: string
          salary?: string | null
          shop_name: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          view_count?: number | null
          year?: string | null
        }
        Update: {
          boost_expires_at?: string | null
          brand?: string | null
          category?: string
          condition?: string | null
          created_at?: string
          currency?: string
          cv_url?: string | null
          description?: string
          experience?: string | null
          id?: string
          image_urls?: string[] | null
          is_boosted?: boolean | null
          is_hidden?: boolean | null
          is_highlighted?: boolean | null
          job_title?: string | null
          model?: string | null
          phone?: string
          price?: number
          region?: string
          salary?: string | null
          shop_name?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number | null
          year?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          ad_id: string
          comment: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          ad_id: string
          comment: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          ad_id?: string
          comment?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comments_ad"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "fk_favorites_ad"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      game_moves: {
        Row: {
          dice_value: number | null
          game_id: string
          id: string
          move_data: Json | null
          move_type: string
          player_id: string
          timestamp: string
          token_position: Json | null
        }
        Insert: {
          dice_value?: number | null
          game_id: string
          id?: string
          move_data?: Json | null
          move_type: string
          player_id: string
          timestamp?: string
          token_position?: Json | null
        }
        Update: {
          dice_value?: number | null
          game_id?: string
          id?: string
          move_data?: Json | null
          move_type?: string
          player_id?: string
          timestamp?: string
          token_position?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "game_moves_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_moves_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string
          current_turn_player: string | null
          expires_at: string | null
          game_state: Json | null
          game_type: string
          id: string
          missed_turns_count: number
          player1_id: string
          player2_id: string | null
          room_code: string | null
          stake_amount: number
          status: string
          total_pot: number
          turn_deadline: string | null
          updated_at: string
          winner_id: string | null
        }
        Insert: {
          created_at?: string
          current_turn_player?: string | null
          expires_at?: string | null
          game_state?: Json | null
          game_type: string
          id?: string
          missed_turns_count?: number
          player1_id: string
          player2_id?: string | null
          room_code?: string | null
          stake_amount: number
          status?: string
          total_pot: number
          turn_deadline?: string | null
          updated_at?: string
          winner_id?: string | null
        }
        Update: {
          created_at?: string
          current_turn_player?: string | null
          expires_at?: string | null
          game_state?: Json | null
          game_type?: string
          id?: string
          missed_turns_count?: number
          player1_id?: string
          player2_id?: string | null
          room_code?: string | null
          stake_amount?: number
          status?: string
          total_pot?: number
          turn_deadline?: string | null
          updated_at?: string
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_current_turn_player_fkey"
            columns: ["current_turn_player"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "games_player1_id_fkey"
            columns: ["player1_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "games_player2_id_fkey"
            columns: ["player2_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "games_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      messages: {
        Row: {
          ad_id: string
          created_at: string
          id: string
          message: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          ad_id: string
          created_at?: string
          id?: string
          message: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          ad_id?: string
          created_at?: string
          id?: string
          message?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_messages_ad"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          related_id: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          related_id?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          related_id?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payment_approvals: {
        Row: {
          ad_id: string | null
          admin_notes: string | null
          amount: number
          created_at: string
          id: string
          payment_confirmed_by_user: boolean | null
          payment_phone: string
          payment_type: string
          shop_name: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ad_id?: string | null
          admin_notes?: string | null
          amount: number
          created_at?: string
          id?: string
          payment_confirmed_by_user?: boolean | null
          payment_phone: string
          payment_type: string
          shop_name?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ad_id?: string | null
          admin_notes?: string | null
          amount?: number
          created_at?: string
          id?: string
          payment_confirmed_by_user?: boolean | null
          payment_phone?: string
          payment_type?: string
          shop_name?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_payment_approvals_ad"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payment_approvals_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          ad_count: number | null
          created_at: string
          email: string
          has_shop: boolean | null
          id: string
          phone: string | null
          shop_name: string | null
          shop_region: string | null
          shop_setup_completed: boolean | null
          subscription_plan: string | null
          trial_ends_at: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          ad_count?: number | null
          created_at?: string
          email: string
          has_shop?: boolean | null
          id?: string
          phone?: string | null
          shop_name?: string | null
          shop_region?: string | null
          shop_setup_completed?: boolean | null
          subscription_plan?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          ad_count?: number | null
          created_at?: string
          email?: string
          has_shop?: boolean | null
          id?: string
          phone?: string | null
          shop_name?: string | null
          shop_region?: string | null
          shop_setup_completed?: boolean | null
          subscription_plan?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          ad_id: string
          created_at: string
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          ad_id: string
          created_at?: string
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          ad_id?: string
          created_at?: string
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ratings_ad"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          admin_notes: string | null
          amount: number
          bank_details: string | null
          created_at: string
          game_id: string | null
          id: string
          payment_phone: string | null
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          bank_details?: string | null
          created_at?: string
          game_id?: string | null
          id?: string
          payment_phone?: string | null
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          bank_details?: string | null
          created_at?: string
          game_id?: string | null
          id?: string
          payment_phone?: string | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          balance: number
          created_at: string
          id: string
          is_admin: boolean
          is_banned: boolean
          matches_lost: number
          matches_won: number
          phone: string | null
          total_winnings: number
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          is_admin?: boolean
          is_banned?: boolean
          matches_lost?: number
          matches_won?: number
          phone?: string | null
          total_winnings?: number
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          is_admin?: boolean
          is_banned?: boolean
          matches_lost?: number
          matches_won?: number
          phone?: string | null
          total_winnings?: number
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_subscription_expiry: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_trial_expiry: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_ad_view_count: {
        Args: { ad_id: string }
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
