const {Category} = require('../Models/categories');
const express = require("express");
const router = express.Router();

// List all Categories
router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList)
    {
         res.status(500).json({success: false})
    } 
    res.status(200).send(categoryList);
})

//Find a category
router.get(`/:id`, async(req, res)=>{
    const category = await Category.findById(req.params.id);

    if(!category)
    {
        res.status(500).json({message:"Category of given id not found!"})

    }
    else{
       res.status(200).send(category)
    }
})

// Add Category
router.post(`/`, async (req, res) =>{
     
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    {
        return res.status(404).send('Sorry, Category cannot be created!')
    }
    res.send(category);
})

module.exports = router;

//Delete Category
router.delete('/:id', async (req, res) =>{
   
      Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category)
        {
            return res.status(200).json({success: true, message:"Category deleted!"})
        }
        else{
            return res.status(404).json({success:false, message: "Category not found!"})
        }
      }).catch(err =>{

        return res.status(400).json({success: false, error: err})
      })
})

// Update Category
router.put('/:id', async(req, res)=>{
    const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
          name: req.body.name,
          icon: req.body.icon,
          color: req.body.color,
    },
    {new: true}
   )  

   if(!category)
   {
       return res.status(404).send('Sorry, Category cannot be updated!')
   }
   res.send(category);
})