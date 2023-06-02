export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          is_subscribed: boolean | null
          last_name: string | null
          stripe_customer_id: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          is_subscribed?: boolean | null
          last_name?: string | null
          stripe_customer_id?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          is_subscribed?: boolean | null
          last_name?: string | null
          stripe_customer_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
