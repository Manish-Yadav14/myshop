const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;

// Middleware  to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]; // Bearer token
  
    if (!token) {
      res.status(401).json({ error: "Unauthorized. No token provided." });
    }
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      // console.log(decoded);
      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized. Invalid token." });
    }
  };
  
module.exports =  isAuthenticated ;
  