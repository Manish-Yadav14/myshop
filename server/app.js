require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/cart')
// const authorisation = require('./middleware/authorisation');

// Middleware to parse JSON bodies
app.use(express.json());

// Allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'], // Specify the HTTP methods you want to allow
    credentials: true, // Include this if you are dealing with credentials (cookies, authorization headers, etc.)
}));


//Routes

app.use('/auth',userRouter);
app.use('/api',productRouter);
app.use('/cart',cartRouter);

  
//Server Initialisation
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});