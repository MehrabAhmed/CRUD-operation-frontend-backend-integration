var {expressjwt:jwt} = require("express-jwt");
const {User} = require("../Models/users");

function authJwt() {
  const secret = process.env.secret;
  return jwt({
    secret,
    algorithms: ["HS256"],
    //isRevoked: isRevoked,
  }).unless({
    path: [
      // {url: /\/ThePizzaGuy\/products(.*)/ , method: ['GET']},
        {url: /\/ThePizzaGuy\/categories(.*)/ , method: ['GET']},
        '/ThePizzaGuy/users/register',
        '/ThePizzaGuy/users/login',
        '/ThePizzaGuy/products/count',
       // '/ThePizzaGuy/users/:id',
        //'/ThePizzaGuy/products/:id'
    ]
  });
}
function requireRole(roles){ 
  return async function(req, res, next) {
  const userRole = req.User.role;

  if (roles.includes(userRole)) {
    next();
  } else {
    res.status(403).send('Access denied.');
  }
}
};

module.exports = { requireRole };
module.exports = authJwt;
//async function isRevoked(req, token) {
 // try {
    //const user = await User.findById(payload.sub);
    // if (!user) {
    //   return done(null, true);
    // }

    // Check if the user has the required role
    // if (req.originalUrl.startsWith("/Admin") && token.payload.role == "Admin") {
    //   //return done(null, true);
    //   return true;
    // } 
    // if(req.originalUrl.startsWith("/ThePizzaGuy/users/Admin") && token.payload.role === "Admin"){
    //   return true;
    // }
    // if( req.originalUrl.startsWith("/Customer") && token.payload.role === "Customer")
    // {
    //   return false;
    // }
   
    
     
    
     
    
    
       
      
    

    // if (req.originalUrl.startsWith("/manager") && user.role !== "Manager") {
    //   return done(null, true);
    // }

    //done();
  // } catch (error) {
  //   done(error, true);
  // }
//}


// async function isRevoked(req, payload, done)
// {
//     if(payload.isAdmin == false)
//     {
//       console.log('Not Admin');
//       done(null, true);
//     }
//       console.log('Admin');
//       done();
      
// }

// async function isRevoked(req, token) {
//   if (token.payload.role == "Customer") {
//     return true;
//   }
//   return false;
// }



