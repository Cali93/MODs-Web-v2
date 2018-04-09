const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String},
    productImage: { type: String, required: true},
    project: {type: mongoose.Schema.Types.ObjectId, ref:'Project'},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}

});

module.exports = mongoose.model('Product', productSchema);