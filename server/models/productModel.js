const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'you must enter a product name'],
            trim: true,
            minlength: [1, 'please provide non empty name'],
            maxlength: [20, "name can't be longer than 20"],
            unique: true,
        },
        price: {
            type: Number,
            required: [true, 'you must enter a product price'],
            min: 1,
        },
        category: {
            type: String,
            enum: {
                values: ['sport', 'music', 'games', 'general'],
                message:
                    "category nust be 'sport', 'music', 'games', 'general'",
            },
            default: 'general',
        },
        size: {
            type: String,
            enum: ['small', 'medium', 'large'],
            default: 'medium',
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
    }
);

productSchema.virtual('shippingPrice').get(function () {
    const prices = {
        small: 5,
        medium: 10,
        large: 15,
    };
    return prices[this.size];
});

productSchema.virtual('priceCategory').get(function () {
    const { size, price } = this;
    const priceCategories = {
        small: price > 100,
        medium: price > 250,
        large: price > 500,
    };
    return priceCategories[size] ? 'expensive' : 'cheap';
});

productSchema.pre('init', function (product) {
    console.log(product);
});

const Product = mongoose.model('Products', productSchema);
module.exports = Product;