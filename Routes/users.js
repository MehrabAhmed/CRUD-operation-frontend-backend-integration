const {User} = require('../Models/users');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { requireRole } = require('../Authenticattion_Helper/jwt');

//Get users list without displaying password
router.get(`/`,requireRole(["Admin"]), async (req, res) =>{
    const userList = await User.find().select('-passwordHash');

    if(!userList)
    {
         res.status(500).json({success: false})
    } 
    res.send(userList);
})

//Get users list with name, phone address city and email
router.get(`/imp`, async (req, res) =>{
    const userList = await User.find().select('name email phone address city');

    if(!userList)
    {
         res.status(500).json({success: false})
    } 
    res.send(userList);
})

//Find one particular user by id without passowrd
router.get(`/:id`, async(req, res)=>{
    const users = await User.findById(req.params.id).select('-passwordHash');

    if(!users)
    {
        res.status(500).json({message:"User of given id not found!"})

    }
    else{
       res.status(200).send(users)
    }
})


// Add/Register a user with password hash
router.post(`/register`, async (req, res) =>{
    
    let users = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        //isAdmin: req.body.isAdmin,
        role: req.body.role,
        street: req.body.street,
        Address: req.body.Address,
        zip: req.body.zip,
        city: req.body.city
    })
    users = await users.save();

    if(!users)
    {
        return res.status(404).send('Sorry, user cannot be created!')
    }
    res.send(users);
})
// async function AuthToken(req, res){
//     const user = await User.findOne({email: req.body.email});
//     const secret = process.env.secret;
//     const token = jwt.sign(
//         {
//             userId : user.id,
//             isAdmin: user.IsAdmin,
//         }, 
//         secret,
//         {expiresIn: '1h'}
//     )
//     res.status(200).send({user: user.email, token: token});
    
// }
//Log In
router.post(`/login`, async(req, res)=>{

    const user = await User.findOne({email: req.body.email});
    const secret = process.env.secret;
    if(!user)
    {
        return res.status(401).send("user not found!");
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash))
    {
        const token = jwt.sign(
            {
                userId : user.id,
                Role: user.role,
            }, 
            secret,
            {expiresIn: '1h'}
        )
        res.status(200).send({user: user.email, token: token});
    } 
    else
    {
        res.status(400).send('Wrong password!');
    }
})

//Delete Product
router.delete('/Admin/:id', async (req, res)=>{
   
    User.findByIdAndRemove(req.params.id).then(user =>{
      if(user)
      {
          return res.status(200).json({success: true, message:"user deleted!"})
      }
      else{
          return res.status(404).json({success:false, message: "user not found!"})
      }
    }).catch(err =>{

      return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;
