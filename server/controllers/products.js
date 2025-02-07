const prisma = require("../db");

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    console.log(products);
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error:${error}`);
  }
};

const getOneProduct = async (req, res) => {
  try {
    const productDetails = await prisma.products.findFirst({
      where:{
        id:req.params.productid,
      }
    });
    
    if(productDetails){
      return res.status(200).send(productDetails);
    }
    return res.status(404).send("Product Not Found!!");

  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error:${error}`);
  }
};

const addProduct = async (req, res) => {
  const {name,description,price,category} = req.body;
  try {
    const newProduct = await prisma.products.create({data:{name,description,price:Number(price),category}});
    console.log(newProduct);
    if(newProduct){
      return res.status(201).send("Product added to db successfully");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error: ${error}`);
  }
};

// const deleteProduct = async (req, res) => {};

// const updateProduct = async (req, res) => {};

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  // deleteProduct,
  // updateProduct,
};
