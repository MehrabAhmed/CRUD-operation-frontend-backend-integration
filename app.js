const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const authJwt = require('./Authenticattion_Helper/jwt');
const errorHandler = require('./Authenticattion_Helper/error_handler');

//dotenv
require('dotenv/config');
const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//using cors
app.use(cors());
app.options('*', cors());

//Routes
const productsRoutes = require('./Routes/products');
const categoriesRoutes = require('./Routes/categories');
const usersRoutes = require('./Routes/users');
const ordersRoutes = require('./Routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


//MongoDB Coonection
mongoose.connect(process.env.MDAtlas)
.then(() => {
    console.log('Connected to database')
})
.catch((err)=>{
    console.log(err);
})

//app running on localhost:3000
app.listen(3000, ()=>{
   
    console.log('server is running on http://localhost:3000');
})