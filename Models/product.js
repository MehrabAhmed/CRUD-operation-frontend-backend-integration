const mongoose = require("mongoose");

const productschema = mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    description:
    {
         type: String,
          required: true,
    },
    richDescription: //optinal 
    {
        type: String,
        default: ''
    },
    image:
    {
         type: String,
         default: ''
    },
    images:
    [{
        type: String

    }],
    price:
    {
        type: Number,
        default: 0,
    },
    category:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    rating:
    {
        type: Number,
        default: 0,
    },
    numReviews:
    {
        type: Number,
        default:0,
    },
    isFeatured:
    {
        type: Boolean,
        default: false,
    },
    dateCreated:
    {
        type: Date,
        default: Date.now,
    }
})

//Changing "_id" key to "id" 
// to make it more frontend friendly

productschema.virtual('id').get(function() {
    return this._id.toHexString();
});

productschema.set('toJSON', {
    virtuals: true,
});

exports.Product = mongoose.model('Product', productschema);