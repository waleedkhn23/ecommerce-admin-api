require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB')

const app = express();
app.use(express.json());

// this is for connect the database 
connectDB();


// this is product Endpoint
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

//this is sales endpoint
const saleRoutes = require('./routes/saleRoutes');
app.use('/api/sales', saleRoutes);


//this is inventory endpoint
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventory', inventoryRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

