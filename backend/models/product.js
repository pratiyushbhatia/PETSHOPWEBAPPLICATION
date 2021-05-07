const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter pet name'],
        trim: true,
        maxLength: [100, 'Pet name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter booking price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0
    },

    description: {
        type: String,
        required: [true, 'Please enter pet description'],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },

            url: {
                type: String,
                required: true
            },
           
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for your pet'],
        enum: {
            values: [
                'Dogs',
                'Cats',
                'Birds'
                
            ],
            message: 'Please select correct category for pet'
        }
    }
})

module.exports = mongoose.model('Product', productSchema);