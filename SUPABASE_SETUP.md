# 🚀 Supabase Setup Guide

## Quick Start

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click **"New Project"**
4. Fill in details:
   - **Name**: `farmexport`
   - **Database Password**: (choose a strong password - SAVE IT!)
   - **Region**: Choose closest to your location
5. Wait ~2 minutes for project creation

### 2. Run Database Migration

Once your project is ready:

#### Option A: Using Supabase Dashboard (Recommended)

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy and paste the ENTIRE content of `supabase/migrations/20240101000000_init.sql`
4. Click **"Run"** or press `Ctrl+Enter`
5. Wait for success ✅
6. Create another **"New Query"**
7. Copy and paste the ENTIRE content of `supabase/seed.sql`
8. Click **"Run"** or press `Ctrl+Enter`
9. You should see: ✅ Success. No rows returned

#### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
npx supabase db push
```

### 3. Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this SECRET!

### 4. Update Environment Variables

Update your `.env.local` file with the real values:

```env
# Replace these with your actual Supabase values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Email notifications
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=export@africmadakeb.com
```

### 5. Set Up Admin User

After running the migrations, you need to create an admin user:

#### Step 1: Create the user account in Supabase Auth

1. In Supabase dashboard, go to **"Authentication"** → **"Users"**
2. Click **"Add User"** → **"Create new user"**
3. Fill in:
   - **Email**: `ann@africmasdakebfarmltd.com`
   - **Password**: (choose a strong password - you'll use this to login)
   - **Auto Confirm User**: ✅ Check this box
4. Click **"Create user"**

#### Step 2: Add the user to the admins table

1. Go to **"SQL Editor"**
2. Run this query (use the SAME email from Step 1):

```sql
INSERT INTO admins (email) VALUES ('ann@africmasdakebfarmltd.com');
```

3. You should see: ✅ Success

Now you can login at `/admin/login` with your email and password!

### 6. Create Storage Buckets

The migration should auto-create these buckets, but if not:

1. Go to **Storage** in Supabase dashboard
2. Create these buckets (make them **public**):
   - `product-images`
   - `spec-sheets`
   - `gallery`
   - `blog-covers`

### 7. Enable Email Auth (For Admin Login)

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates if needed
4. Go to **Authentication** → **URL Configuration**
5. Add your site URL: `http://localhost:3002` (for dev) and your production URL

### 8. Update Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add the same variables from `.env.local`
4. Redeploy your site

## 🎉 You're Done!

Your local site should now connect to Supabase properly. Refresh http://localhost:3002 to test!

## Next Steps

- [ ] Sign up as admin at `/admin/login`
- [ ] Upload product images
- [ ] Test the RFQ form
- [ ] Customize content in the CMS

## Troubleshooting

**Error: "Your project's URL and Key are required"**
- Make sure `.env.local` has real values (not the placeholder ones)
- Restart the dev server: `npm run dev`

**Error: "relation does not exist"**
- Run the migration SQL files in the correct order
- Check that all tables were created successfully

**Can't login to admin**
- Make sure your email is in BOTH:
  1. **Authentication → Users** (the actual user account)
  2. **admins table** (the permission record)
- Check that Email auth is enabled in Supabase
- Verify your password is correct
- For magic link: Check your email spam folder

## Need Help?

Check the Supabase documentation: https://supabase.com/docs

