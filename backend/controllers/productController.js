const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const APIFeatures = require('../utils/apiFeatures')

const cloudinary = require('cloudinary')



//Create new Pet => /api/v1/pet/new

exports.newProduct =catchAsyncErrors( async (req, res, next) => {
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;
    

    const  product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })

})

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts =catchAsyncErrors( async (req, res, next) => {

    const resPerPage=4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .pagination(resPerPage)
                        

    const products = await apiFeatures.query;

    setTimeout(() => {

        res.status(200).json({
            success: true,
            productsCount,
            resPerPage,
            products
        })

    } ,100);

  

})

// Get all products  (Admin) =>   /api/v1/admin/products
exports.getAdminProducts =catchAsyncErrors( async (req, res, next) => {

  

    const products = await Product.find();

    

        res.status(200).json({
            success: true,
            products
        }) 


})


// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
        
    }


    res.status(200).json({
        success: true,
        product
    })

})

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct =catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})