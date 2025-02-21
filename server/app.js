require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const uploadImageRouter = require('./routes/imageUpload');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = 3000;

// middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", userRouter);
app.use("/api", productRouter);
app.use("/cart", cartRouter);
app.use("/api/images",uploadImageRouter)

// payment gateway
app.post("/create-checkout-session", async (req, res) => {
  try {
    if(!Array.isArray(req.body.items)) return res.json({msg:"Cart is empty"});
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.product.price*100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/failed',
    });

    return res.json({id:session.id})
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }

});


//Server Initialisation
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
