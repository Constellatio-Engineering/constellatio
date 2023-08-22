export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database 
{
  public: {
    CompositeTypes: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Tables: {
      profiles: {
        Insert: {
          created_at?: string | null;
          first_name?: string | null;
          id: string;
          is_subscribed?: boolean | null;
          last_name?: string | null;
          stripe_customer_id?: string | null;
        };
        Row: {
          created_at: string | null;
          first_name: string | null;
          id: string;
          is_subscribed: boolean | null;
          last_name: string | null;
          stripe_customer_id: string | null;
        };
        Update: {
          created_at?: string | null;
          first_name?: string | null;
          id?: string;
          is_subscribed?: boolean | null;
          last_name?: string | null;
          stripe_customer_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never
    };
  };
}
