require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth/auth-route');
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter =  require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')

// create a database connection

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("mongodb connected"))
.catch((error)=> console.log(error));

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : process.env.CLIENT_URL,
        methods : ['GET' , 'POST' , 'DELETE' , 'PUT'],
        allowedHeaders : [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true,
    })
)

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth' , authRouter);
app.use("/api/admin/products" , adminProductsRouter);
app.use("/api/shop/products" , shopProductsRouter);
app.use("/api/shop/cart" , shopCartRouter);
app.use("/api/shop/address" , shopAddressRouter);

app.listen(PORT , ()=> console.log(`Server is running on ${PORT}`))

console.log("PORT =", process.env.PORT);
console.log("CLIENT_URL =", process.env.CLIENT_URL);
console.log("MONGO_URL =", process.env.MONGO_URL);



