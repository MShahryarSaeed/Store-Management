const productModel=require("../../../models/productModel");

// Get all products (GET request to '/products')
const GetAllProducts=async (req, res) => {

  try {
    const products = await productModel.find(); 
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Get a single product by ID (GET request to '/products/:id')
const GetSingleProduct= async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productModel.findById(productId); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Create a new product (POST request to '/products')
 const createProduct= async (req, res) => {
  const { name, description, price } = req.body; // Extract product data from request body

  // Validation (optional, implement as needed)
  if (!name || !description || !price) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newProduct = await productModel.create({
        name:name,
        description:description,
        price:price
    })
    
    res.status(201).json(newProduct); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product by ID (PUT request to '/products/:id')
 const updateProduct= async (req, res) => {
  const { productId } = req.params;
  const { name, description, price } = req.body; // Extract update data

  // Validation (optional, implement as needed)

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { $set: { name, description, price } }, 
      { new: true } // Return the updated product
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product by ID (DELETE request to '/products/:id')
 const DeleteProduct= async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={GetAllProducts,GetSingleProduct,createProduct,DeleteProduct,updateProduct}
