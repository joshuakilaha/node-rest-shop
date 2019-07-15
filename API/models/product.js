const mongoose = require('mongoose');

//Creating Mongoose Schema
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    productImage: {type: String, required:true}
});

//Exporting the Mongoose Schema
module.exports = mongoose.model('Product', productSchema);