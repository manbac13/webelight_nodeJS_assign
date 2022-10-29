const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/basicFMCG")

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    name : {type:String, required:true},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true}
})

const register = mongoose.model("register", registerSchema)

module.exports = register;