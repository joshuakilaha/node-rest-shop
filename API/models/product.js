const mongoose = require('mongoose');

//Creating Mongoose Schema
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

//Exporting the Mongoose Schema
module.exports = mongoose.model('Product', productSchema);