const prisma = require("../db");

const addProductToCart = async (req, res) => {
  const { userId, product } = req.body; // Expecting userId and product object from the request body

  try {
    // Find the user's cart
    const cart = await prisma.cart.findFirst({
      where: { userId: userId },
    });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      const newCart = await prisma.cart.create({
        data: {
          userId: userId,
          items: [{ ...product, quantity: 1 }], // Initialize with the new product
        },
      });
      return res.status(201).json(newCart);
    }

    const existingItem = cart.items.find(item => item.id === product.id);

    if (existingItem) {
      // If product exists, update its quantity
      const updatedItems = cart.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      const updatedCart = await prisma.cart.update({
        where: { userId: userId },
        data: {
          items: updatedItems,
        },
      });

      return res.status(200).json(updatedCart);
    } else {
      // If product does not exist, add it to the items with quantity 1
      const updatedItems = [...cart.items, {...product, quantity: 1 }];

      const updatedCart = await prisma.cart.update({
        where: { userId: userId },
        data: {
          items: updatedItems,
        },
      });
      return res.status(200).json(updatedCart);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error: ${error.message}`);
  }
};

const removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.body; // Expecting userId and productId from the request body

  try {
    // Find the user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
    });

    // If the cart doesn't exist, return an error
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product to be removed
    const updatedItems = cart.items.filter((item) => item.id !== productId);

    // Update the cart with the new items list
    const updatedCart = await prisma.cart.update({
      where: { userId: userId },
      data: {
        items: updatedItems,
      },
    });

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error: ${error.message}`);
  }
};

const getCart = async(req,res)=>{
  try {
    const products = await prisma.cart.findMany();
    console.log(products);
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error:${error}`);
  }
}

module.exports = { addProductToCart, removeProductFromCart ,getCart};
