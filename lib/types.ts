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
      admins: {
        Row: {
          email: string
        }
        Insert: {
          email: string
        }
        Update: {
          email?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          business_name: string | null
          phone: string | null
          whatsapp: string | null
          email: string | null
          address: string | null
          socials: Json | null
          seo_defaults: Json | null
          gsc_verification_code: string | null
          ga_measurement_id: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          business_name?: string | null
          phone?: string | null
          whatsapp?: string | null
          email?: string | null
          address?: string | null
          socials?: Json | null
          seo_defaults?: Json | null
          gsc_verification_code?: string | null
          ga_measurement_id?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          business_name?: string | null
          phone?: string | null
          whatsapp?: string | null
          email?: string | null
          address?: string | null
          socials?: Json | null
          seo_defaults?: Json | null
          gsc_verification_code?: string | null
          ga_measurement_id?: string | null
          updated_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          short_desc: string | null
          long_desc: string | null
          is_featured: boolean | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          short_desc?: string | null
          long_desc?: string | null
          is_featured?: boolean | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          short_desc?: string | null
          long_desc?: string | null
          is_featured?: boolean | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      product_specs: {
        Row: {
          id: string
          product_id: string | null
          grade_type: string | null
          moisture: string | null
          purity: string | null
          origin: string | null
          packaging_options: string[] | null
          moq: string | null
          shelf_life: string | null
          lead_time: string | null
          documentation: string[] | null
          applications: string[] | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          grade_type?: string | null
          moisture?: string | null
          purity?: string | null
          origin?: string | null
          packaging_options?: string[] | null
          moq?: string | null
          shelf_life?: string | null
          lead_time?: string | null
          documentation?: string[] | null
          applications?: string[] | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string | null
          grade_type?: string | null
          moisture?: string | null
          purity?: string | null
          origin?: string | null
          packaging_options?: string[] | null
          moq?: string | null
          shelf_life?: string | null
          lead_time?: string | null
          documentation?: string[] | null
          applications?: string[] | null
          updated_at?: string | null
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string | null
          url: string
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          url: string
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string | null
          url?: string
          sort_order?: number | null
          created_at?: string | null
        }
      }
      spec_sheets: {
        Row: {
          id: string
          product_id: string | null
          title: string | null
          file_url: string
          created_at: string | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          title?: string | null
          file_url: string
          created_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string | null
          title?: string | null
          file_url?: string
          created_at?: string | null
        }
      }
      page_sections: {
        Row: {
          id: string
          page_key: string | null
          title: string | null
          content: Json | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          page_key?: string | null
          title?: string | null
          content?: Json | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          page_key?: string | null
          title?: string | null
          content?: Json | null
          updated_at?: string | null
        }
      }
      gallery_items: {
        Row: {
          id: string
          title: string | null
          url: string
          caption: string | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          title?: string | null
          url: string
          caption?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string | null
          url?: string
          caption?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          cover_image_url: string | null
          tags: string[] | null
          is_published: boolean | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          cover_image_url?: string | null
          tags?: string[] | null
          is_published?: boolean | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          cover_image_url?: string | null
          tags?: string[] | null
          is_published?: boolean | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      rfqs: {
        Row: {
          id: string
          rfq_no: string | null
          full_name: string | null
          company_name: string | null
          email: string | null
          phone: string | null
          whatsapp: string | null
          role: string | null
          destination_country: string | null
          incoterm: string | null
          timeline: string | null
          requested_products: Json | null
          compliance_needs: Json | null
          notes: string | null
          status: string | null
          internal_notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          rfq_no?: string | null
          full_name?: string | null
          company_name?: string | null
          email?: string | null
          phone?: string | null
          whatsapp?: string | null
          role?: string | null
          destination_country?: string | null
          incoterm?: string | null
          timeline?: string | null
          requested_products?: Json | null
          compliance_needs?: Json | null
          notes?: string | null
          status?: string | null
          internal_notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          rfq_no?: string | null
          full_name?: string | null
          company_name?: string | null
          email?: string | null
          phone?: string | null
          whatsapp?: string | null
          role?: string | null
          destination_country?: string | null
          incoterm?: string | null
          timeline?: string | null
          requested_products?: Json | null
          compliance_needs?: Json | null
          notes?: string | null
          status?: string | null
          internal_notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}






