require("dotenv").config();
const prisma = require('../db');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {SECRET_KEY} = process.env;

// Generate a JWT token
const generateToken = (User) => {
    return jwt.sign({email: User.email , username:User.username}, SECRET_KEY, {
      expiresIn: "2h", // Token expires in 1 hour
    });
};

const signup = async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        // Email validation (basic example)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({ error: 'Invalid email format' });
        }

        //checking if user exists already
        const existingUser = await prisma.user.findFirst({ where: {email: email,}});
        if (existingUser) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

        const newUser = await prisma.user.create({data:{username,email,password:hashedPassword}});

        // const token = generateToken(newUser);
        // console.log({token});
        if(newUser){
            return res.status(201).send("User registered... Login Now");
        }
        
    } catch (error) {
        return res.status(401).send(`Error: ${error}`);
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        console.log({email,password});
        //check for user exists or not...
        const User = await prisma.user.findFirst({where:{email:email,}});
        if(!User){
            return res.status(404).send({ error: 'User not found' });
        }

        console.log(User);

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        //generate token
        const token = generateToken(User);

        // console.log({token});
        return res.status(201).send({token});
        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUserInfo = async(req,res)=>{
    const {email} = req.body;
    try {
        const userInfo = await prisma.user.findFirst({where:{email:email}})
        return res.status(201).send(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {login,signup,getUserInfo};