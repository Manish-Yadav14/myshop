const prisma = require("../db");

const addProductToCart = async (req, res) => {
  const { userId, productId } = req.body; 

  try {
    const user  = prisma.user.findUnique({where:{id:userId}});
    const product = prisma.product.findUnique({where:{id:productId}});
    if(!user || !product || product.stock < 1){
      return res.json("Item is either not available or out of stock!");
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where:{
          userId_productId:{
            userId,productId
          }
      }
    });

    if(existingCartItem){
      const updatedCartItem = await prisma.cartItem.update({
        where:{
          id:existingCartItem.id
        },
        data:{
          quantity: existingCartItem.quantity + 1
        }
      });

      // console.log('Cart item updated:', updatedCartItem);
      return res.json(updatedCartItem);
    }
    else {
      const newCartItem = await prisma.cartItem.create({
        data:{
          userId,
          productId,
          quantity:1,
        },
      });

      // console.log('Cart item added:', newCartItem);
      return res.json(newCartItem);
    }
   
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send(`Error: ${error.message}`);
  }
};

const removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.body; // Expecting userId and productId from the request body

  try {
    const user  = prisma.user.findUnique({where:{id:userId}});
    const product = prisma.product.findUnique({where:{id:productId}});
    if(!user || !product){
      return res.json("Item is either not in your stock or u are not logged in!");
    }
    const deletedCartItem = await prisma.cartItem.delete({
      where: { 
        userId_productId:{
          userId,productId
        }
       },
    });
    if(deletedCartItem) return res.sendStatus(200).json({msg:"Item deleted successfully"});
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send(`Error: ${error.message}`);
  }
};

const getCart = async(req,res)=>{
  const {userId} = req.body;
  try {
    const userCart = await prisma.cartItem.findMany(
      {where:{userId:userId},
      include:{
        product:{
          include:{
            category:true,
          }
      }}});

      // console.log(userCart)

    if (!userCart || userCart.length === 0) {
      return res.json("User has no items in the cart");
    }

    return res.json(userCart);
    
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}

module.exports = { addProductToCart, removeProductFromCart ,getCart};
