const Product = require("../models/Product");

// Create Product
exports.createProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            price,
            category,
            stock
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a product image"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image: req.file.path,
            createdBy: req.user._id
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Products
exports.getProducts = async(req,res)=>{
    try{
        const { category, subCategory } = req.query;
        let filter = {};
        if(category){
            filter.category = category;
        }
        if(subCategory){
            filter.subCategory = subCategory;
        }
        const products = await Product.find(filter);
        res.json(products);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

// Get Single Product
exports.getProduct = async(req,res)=>{
    try{
        const product = await Product.findById(
            req.params.id
        );
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }
        res.json(product);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

// Update Product
exports.updateProduct = async(req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        res.json({
            message:"Product updated successfully",
            product
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

// Delete Product
exports.deleteProduct = async(req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(
            req.params.id
        );
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }
        res.json({
            message:"Product deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};