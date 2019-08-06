const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProdSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    date:{type: Date, default: Date.now},
    user: { type: String} //id para enlazar con el prod
});

module.exports = mongoose.model('Prod', ProdSchema);