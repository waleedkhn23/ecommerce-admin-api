
E-commerce Admin API - Project Documentation


🛍️ OVERVIEW:

A back-end API built using Node.js and Express.js to manage an e-commerce admin dashboard. It provides endpoints to track sales, manage inventory, and register products.

🚀 TECH STACK:

1 Backend: Express.js (Node.js)
2 Database: MongoDB (Mongoose ODM)
3 API Type: RESTful
4 Demo Data: Includes script to seed mock data

📦 FEATURES:

1. Sales Management:
   - Add and filter sales
   - View revenue by day, month, year
   - Summarize and analyze sales trends

2. Inventory Management:
   - View current inventory levels
   - Low stock alerts
   - Update stock with historical tracking

3. Product Management:
   - Add new products
   - View all products

⚙️ SETUP INSTRUCTIONS:

 Clone the repository:
   git clone https://github.com/YOUR-USERNAME/ecommerce-admin-api.git
   cd ecommerce-admin-api
 Install dependencies:
   npm install

 Create a `.env` file:
DB_name = ecommerce_admin
   PORT=
   MONGO_URI=mongodb:

 Start the development server:
   npm run dev

 DEMO DATA:

Run this script to populate your database with test data:
   node scripts/populateDemoData.js

API ENDPOINTS:

Products:
 POST /api/products        => Add a new product
 GET  /api/products        => Get all products

Sales:
 POST /api/sales           => Record a new sale
 GET  /api/sales           => List/filter sales
 GET  /api/sales/summary?period=daily|monthly|yearly

Inventory:
 GET  /api/inventory                   => View all inventory
 GET  /api/inventory/low-stock?threshold=5
PATCH /api/inventory/:id             => Update stock level

 DATABASE SCHEMA:

Product:
  name: String
  category: String
  price: Number
  stock: Number
  createdAt: Date

Sale:
  product: ObjectId
  quantity: Number
  totalAmount: Number
  saleDate: Date
  channel: 'Amazon' | 'Walmart'

InventoryChange:
  product: ObjectId
  previousStock: Number
  newStock: Number
  changeDate: Date



AUTHOR:

Developed by Waleed khan
Email: waleedkhn23@gmail.com


