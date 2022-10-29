const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/basicFMCG")
const bodyparser = require("body-parser")
const { body, validationResult } = require('express-validator');
const register = require("../models/registerSchema")
const employee = require("../models/employeeSchema");

const router = express.Router();

router.use(bodyparser());

//---------------------------------------------------------------------
//get all the employees
router.get("/getAllEmployees", async(req,res)=>{
    const data = await employee.find()
    res.json({
        status : "Success",
        data
    })
})
//Get the data only of you are from from Admin
//create employee data
router.post("/getCustomerData/:id", async(req,res)=>{
    const employeeDetails = await employee.findOne({_id:req.params.id});
    if(!employeeDetails){
        res.json({
            status : "Failed",
            message : "No employee exists with such credentials"
        })
    }
    if(employeeDetails.role === "Admin"){
        const customers = await register.find()
        res.status(200).json({
            status : "Success",
            customers
        })
    }
    else{
        res.status(400).json({
            status : "Failed",
            message : "Employee not authorized"
        })
    }
})


//You can create data only if your role is HR
router.post("/registerEmployee", async(req,res)=>{
    try {
        const employeeData = await employee.create(req.body);
        res.status(200).json({
            status : "Success",
            message : "Employee Registered Successfully",
            employeeData
        })
    } catch (error) {
        res.status(500).json({
            status : "Failed",
            message : error.message
        })
    }
    
})

module.exports = router;