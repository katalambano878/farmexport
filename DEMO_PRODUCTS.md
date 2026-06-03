# Demo Products - Image Guide

## Product Images Created

We have 6 demo products. The images already exist in `/public/images/`:

1. **Unrefined Grade A Shea Butter** → `shea-butter.png`
2. **Premium Shea Oil** → `shea-oil.png`
3. **Premium Grade Soybean** → `soybean.png`
4. **Cold-Pressed Baobab Oil** → `baobab-oil.png`
5. **Raw Cashew Nuts in Shell** → `cashew.png`
6. **Premium Dried Ginger Root** → `ginger.png`

## How to Add Products to Database

### Step 1: Run the SQL Script

In your Supabase dashboard:
1. Go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/demo-products.sql`
4. Run the query
5. You should see: "Successfully inserted 6 demo products with specifications!"

### Step 2: Verify in Admin Panel

1. Go to your admin panel: `/admin/products`
2. You should see all 6 products listed
3. Click the edit button on any product to see full details

### Step 3: Upload Product Images (Optional)

If you want to add product images to the database:

1. Go to **Supabase Storage**
2. Navigate to the `product-images` bucket
3. Upload the corresponding images:
   - `shea-butter.png`
   - `shea-oil.png`
   - `soybean.png`
   - `baobab-oil.png`
   - `cashew.png`
   - `ginger.png`

4. Then in the admin panel, edit each product and add the image URL from Supabase Storage

## Product Details Summary

### Featured Products (4):
1. **Unrefined Grade A Shea Butter** - MOQ: 100kg
2. **Premium Shea Oil** - MOQ: 200L
3. **Premium Grade Soybean** - MOQ: 20 MT
4. **Cold-Pressed Baobab Oil** - MOQ: 25L

### Additional Products (2):
5. **Raw Cashew Nuts in Shell** - MOQ: 20 MT
6. **Premium Dried Ginger Root** - MOQ: 500kg

All products include:
- Detailed descriptions
- Complete specifications
- Packaging options
- Documentation requirements
- Industry applications
- Lead times and shelf life


