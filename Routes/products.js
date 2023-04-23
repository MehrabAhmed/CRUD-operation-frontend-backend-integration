const {Product} = require('../Models/product');
const express = require("express");
const { Category } = require('../Models/categories');
const router = express.Router();
const mongoose = require('mongoose');


//Get list of all products
router.get(`/Customer/`, async (req, res) =>{
    const productList = await Product.find();

    if(!productList)
    {
         res.status(500).json({success: false})
    } 
    res.send(productList);
})

//Find a particular product by id and also show detail of it's category
router.get(`/:id`, async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('category');

    if(!product)
    {
         res.status(500).json({success: false})
    } 
    res.send(product);
})

//Find product and display its name, descrption and price
// router.get(`/`, async (req, res) =>{
//     const productList = await Product.find().select("name description price -_id");

//     if(!productList)
//     {
//          res.status(500).json({success: false})
//     } 
//     res.send(productList);
// })

//Create product
router.post(`/`, async (req, res) =>{

    const category = await Category.findById(req.body.category);
    if(!category){
        return res.status(400).send("Invalid Category!")
    }
    let product = new Product({

        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,

    })
     
    product = await product.save();
    
    if(!product)
    {
        return res.status(500).send('sorry, product cannot be created!')
    }
    
        res.send(product);
    
})

//Update product
router.put('/:id', async(req, res)=>{

    if(!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(400).send("Invalid Product Id!")
    }

    const category = await Category.findById(req.body.category);
    if(!category)
    {
        return res.status(400).send("Invalid Category!")
    }

    const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,

    },
    {new: true}
   )  

   if(!product)
   {
       return res.status(404).send('Sorry, product cannot be updated!')
   }
   res.send(product);
})

//Delete product
router.delete('/:id', async (req, res) =>{
   
    Product.findByIdAndRemove(req.params.id).then(product =>{
      if(product)
      {
          return res.status(200).json({success: true, message:"Product deleted!"})
      }
      else{
          return res.status(404).json({success:false, message: "Product not found!"})
      }
    }).catch(err =>{

      return res.status(400).json({success: false, error: err})
    })
})

//count products
router.get(`/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount)
    {
         res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

//Featured products
router.get(`/get/featured`, async (req, res) =>{
    const products = await Product.find({isFeatured: true})

    if(!products)
    {
         res.status(500).json({success: false})
    } 
    res.send(products);
})

//filtering and getting products by category
router.get(`/`, async (req, res) =>{

    //localhost:3000/ThePizzaGuy/products?categories=3576,78383
    let filter= {};
    if(req.query.categories)
    {
        filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).populate('category');

    if(!productList)
    {
         res.status(500).json({success: false})
    } 
    res.send(productList);
})

module.exports = router;
