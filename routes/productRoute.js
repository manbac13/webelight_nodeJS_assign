const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/basicFMCG")
const bodyparser = require("body-parser")
const products = require("../models/productsSchema")

const router = express.Router();

router.use(bodyparser());

//---------------------------------------------------------
//-getting all the products
router.get("/", async (req, res) => {
    const productData = await products.find()
    res.status(200).json({
        status : "Success",
        productData
    })
})

//---------------------------------------------------------
//getting category wise products
router.get("/:category", async(req,res)=>{
    try{
        const productData = await products.find({category: req.params.category})
        if(!productData){
            res.status(400).json({
                status : "Failed",
                message : "No such category exists"
            })
        }
        res.status(400).json({
            status : 'Success',
            productData
        })
    }
    catch(error){
        res.status(500).json({
            status : 'Failed',
            message : error.message
        })
    }
    

})

//---------------------------------------------------------
//List a product
router.post("/list", async (req, res) => {
    try {
        const productData = await products.create(req.body);
        res.status(200).json({
            status: "Success",
            message: "Product added Successfully",
            productData
        })
    }
    catch(error){
        res.status(500).json({
            status : "Failed",
            message : error.message
        })
    }
})

module.exports = router
