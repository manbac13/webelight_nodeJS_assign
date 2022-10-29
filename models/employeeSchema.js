const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/basicFMCG")

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name : {type : String},
    role : {type : String}
})

const employee = mongoose.model("employees", employeeSchema);

module.exports = employee;