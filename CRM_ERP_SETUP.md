# 🚀 CRM & ERP Features Setup Guide

## Overview

Your admin backend now includes comprehensive **CRM** (Customer Relationship Management) and **ERP** (Enterprise Resource Planning) features tailored for agricultural export business.

## 📋 Quick Setup

### 1. Run the Migration

In your Supabase Dashboard → SQL Editor:

```sql
-- Copy and run the contents of:
supabase/migrations/20240102000000_crm_erp.sql
```

This creates 9 new tables for complete business management.

## 🎯 CRM Features

### **Leads Management** (`/admin/crm/leads`)
Track potential customers through your sales pipeline:

- **Statuses**: NEW → CONTACTED → QUALIFIED → CONVERTED → LOST
- **Lead Sources**: Website RFQ, Trade Show, Cold Outreach, Referral
- **Track**: Estimated deal value, interest products, follow-up dates
- **Assign**: Sales team members to specific leads
- **Activities**: Log calls, emails, meetings, quotes sent

**Use Cases:**
- Import leads from trade shows
- Convert RFQs to qualified leads automatically
- Track follow-up schedule
- Measure conversion rates

### **Customers Management** (`/admin/crm/customers`)
Manage active buyers and converted leads:

- **Payment Terms**: NET30, NET60, Prepayment, Letter of Credit
- **Credit Limits**: Set maximum order amounts
- **Track**: Total orders, lifetime revenue per customer
- **Status**: ACTIVE, INACTIVE, BLACKLISTED
- **Preferred Incoterms**: FOB, CIF, EXW

**Use Cases:**
- Maintain customer database
- Track customer lifetime value
- Manage payment terms
- Monitor credit limits

## 🏭 ERP Features

### **Orders Management** (`/admin/erp/orders`)
Full sales order lifecycle:

- **Order Statuses**: PENDING → CONFIRMED → IN_PRODUCTION → READY → SHIPPED → DELIVERED
- **Payment Tracking**: PENDING, DEPOSIT_PAID, PAID, OVERDUE
- **Link to**: Customer, Original RFQ, Multiple products
- **Incoterms**: FOB, CIF, EXW with full documentation
- **Multi-currency** support

**Use Cases:**
- Convert RFQs to confirmed orders
- Track production status
- Manage payment collection
- Generate invoices and packing lists

### **Inventory Management** (`/admin/erp/inventory`)
Real-time stock tracking:

- **Available Quantity**: Current stock on hand
- **Reserved Quantity**: Stock allocated to pending orders
- **Reorder Levels**: Automatic low stock alerts
- **Warehouse Locations**: Track where products are stored
- **Last Restocked**: Inventory replenishment history

**Use Cases:**
- Prevent overselling
- Get low stock alerts
- Plan procurement
- Track warehouse logistics

### **Shipments Tracking** (`/admin/erp/shipments`)
Export logistics management:

- **Container Details**: Type (20ft, 40ft), number, B/L
- **Shipping Lines**: Maersk, MSC, etc.
- **ETD/ETA**: Estimated departure/arrival dates
- **ATD/ATA**: Actual departure/arrival (auto-updates)
- **Status**: PREPARING → IN_TRANSIT → ARRIVED → CLEARED → DELIVERED
- **Document Tracking**: COA, MSDS, Phyto certificates

**Use Cases:**
- Track container shipments
- Share tracking links with customers
- Monitor delivery timelines
- Manage export documentation

## 📊 Business Intelligence

### **Dashboard Metrics** (Auto-calculated)

**CRM Metrics:**
- New leads count
- Qualified leads
- Conversion rate
- Total customers
- Revenue by customer

**ERP Metrics:**
- Active orders
- Orders in production
- Shipped this month
- Total revenue
- Low stock alerts
- In-transit shipments

## 🔄 Typical Workflow

### Sales Process:
1. **RFQ Submitted** → Auto-create lead
2. **Lead Qualified** → Assign to sales rep
3. **Quote Sent** → Log activity
4. **Lead Converted** → Create customer record
5. **Order Confirmed** → Create order, reserve inventory
6. **Production** → Update order status
7. **Ready to Ship** → Create shipment
8. **Shipped** → Track container
9. **Delivered** → Mark complete, update customer stats

### Inventory Flow:
1. **Purchase from Supplier** → Create PO
2. **Receive Stock** → Update inventory
3. **Order Confirmed** → Reserve quantity
4. **Order Shipped** → Deduct from inventory
5. **Low Stock Alert** → Create new PO

## 🎨 Sidebar Organization

Your admin panel is now organized into sections:

```
📊 Dashboard
├─ 💼 CRM
│  ├─ Leads
│  └─ Customers
├─ 🏭 ERP
│  ├─ Orders
│  ├─ Inventory
│  └─ Shipments
└─ 📝 Content
   ├─ Products
   ├─ RFQs
   ├─ Site Content
   ├─ Gallery
   └─ Blog
```

## 🚀 Next Steps

1. **Run the migration** in Supabase
2. **Refresh** your admin panel
3. **Test** the new CRM/ERP menus
4. **Import** existing customers (if any)
5. **Start tracking** leads and orders!

## 💡 Pro Tips

- **Convert RFQs to Leads**: Add a "Convert to Lead" button on RFQ detail page
- **Link Orders to RFQs**: Reference original inquiry for context
- **Track Activities**: Log every customer interaction
- **Set Follow-ups**: Never miss a sales opportunity
- **Monitor Inventory**: Set reorder levels to prevent stockouts
- **Update Shipments**: Keep customers informed with tracking

Your agricultural export business now has enterprise-grade management tools! 🎉


