const prisma = require("../db");

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({include:{category:true}});
    return res.status(200).json(products);
  } catch (error) {
    // console.error(error);
    return res.status(500).send(`Error:${error}`);
  }
};

const getOneProduct = async (req, res) => {
  const {productId} = req.body;
  try {
    const productDetails = await prisma.product.findFirst({where:{id:productId},include:{category:true}});
    
    if(productDetails){
      return res.status(200).json(productDetails);
    }
    return res.status(404).send("Product Not Found!!");

  } catch (error) {
    // console.error(error);
    return res.status(500).send(`Error:${error}`);
  }
};

const addProduct = async (req, res) => {
  const {name,description,price,category,images} = req.body;
  try {
    let Category =  await prisma.category.findFirst({where:{name:category}});
    if(!Category){
      Category = await prisma.category.create({
        data: {
          name: category,
          description: `${category} category description`,
        },
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: Number(price),
        category: {
          connect: { id: Category.id }, // Directly connect the product to the category via the category's id
        },
        images,
      },
    });
  
    if(newProduct){
      return res.status(201).send("Product added to db successfully");
    }
  } catch (error) {
    // console.error(error);
    return res.status(500).send(`Error: ${error}`);
  }
};

const deleteProduct = async (req, res) => {
  const {productId} = req.body;
  try {
    const product  = await prisma.product.delete({where:{id:productId}});
    if(product) return res.json({msg:"Product deleted successfully..."});
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  const {productId} = req.params;
  const {name,description,price} = req.body;
  try {
    await prisma.product.update({
      where:{id:productId},
      data: {
        name,description,price:Number(price)
      }
    })
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
