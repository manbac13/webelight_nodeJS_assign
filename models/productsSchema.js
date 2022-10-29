const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/basicFMCG")

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name : String,
    category : {type : String, required : true},
    price : {type:Number ,required :true}
})

const product = mongoose.model("products", productsSchema);

module.exports = product