# Environment Variables Setup

Copy these to your `.env.local` file:

```env
# ===========================================
# SUPABASE (Required)
# ===========================================

# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase anonymous/public key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase service role key (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ===========================================
# EMAIL NOTIFICATIONS (Optional)
# ===========================================

# Resend API key for sending emails
RESEND_API_KEY=re_xxxxxxxxxxxx

# Admin email to receive RFQ notifications
ADMIN_EMAIL=export@africmadakeb.com

# ===========================================
# SITE CONFIGURATION
# ===========================================

# Public URL of your deployed site
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Setup Instructions

### 1. Supabase Setup
1. Create a new project at [https://supabase.com](https://supabase.com)
2. Go to **Settings > API** to get your URL and keys
3. Run the migration file: `supabase/migrations/20240101000000_init.sql`
4. Run the seed file: `supabase/seed.sql`
5. Add your admin email to the `admins` table

### 2. Storage Buckets
The migration creates these buckets automatically:
- `product-images` (public)
- `spec-sheets` (public)
- `gallery` (public)
- `blog-covers` (public)

### 3. Authentication
1. Enable Email/Password auth in Supabase > Authentication
2. Add your site URL to allowed redirect URLs:
   - `http://localhost:3002/admin/auth/callback`
   - `https://your-domain.vercel.app/admin/auth/callback`

### 4. Vercel Environment Variables
Add these same variables in Vercel Dashboard > Settings > Environment Variables

### 5. Resend (Optional - for email notifications)
1. Sign up at [https://resend.com](https://resend.com)
2. Create an API key
3. Verify your sending domain


