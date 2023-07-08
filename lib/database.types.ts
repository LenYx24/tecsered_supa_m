export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          created_at: string | null
          id: number
          item_id: number
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          item_id: number
          url: string
        }
        Update: {
          created_at?: string | null
          id?: number
          item_id?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_item_id_fkey"
            columns: ["item_id"]
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_item_id_fkey"
            columns: ["item_id"]
            referencedRelation: "itemswithfirstname"
            referencedColumns: ["id"]
          }
        ]
      }
      items: {
        Row: {
          created_at: string | null
          desc: string | null
          id: number
          img_name: string | null
          title: string | null
          user_id: string
          value: number | null
        }
        Insert: {
          created_at?: string | null
          desc?: string | null
          id?: number
          img_name?: string | null
          title?: string | null
          user_id: string
          value?: number | null
        }
        Update: {
          created_at?: string | null
          desc?: string | null
          id?: number
          img_name?: string | null
          title?: string | null
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "items_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      transaction_item: {
        Row: {
          created_at: string | null
          id: number
          item_id: number
          trans_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          item_id: number
          trans_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          item_id?: number
          trans_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "transaction_item_item_id_fkey"
            columns: ["item_id"]
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_item_item_id_fkey"
            columns: ["item_id"]
            referencedRelation: "itemswithfirstname"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_item_trans_id_fkey"
            columns: ["trans_id"]
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          created_at: string | null
          id: number
          initiator: string
          receiver: string
          status: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          initiator: string
          receiver: string
          status: string
        }
        Update: {
          created_at?: string | null
          id?: number
          initiator?: string
          receiver?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_initiator_fkey"
            columns: ["initiator"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_receiver_fkey"
            columns: ["receiver"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      itemswithfirstname: {
        Row: {
          created_at: string | null
          desc: string | null
          first_name: string | null
          id: number | null
          img_name: string | null
          title: string | null
          user_id: string | null
          value: number | null
        }
        Relationships: [
          {
            foreignKeyName: "items_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
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
