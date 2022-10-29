const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/basicFMCG")
const bodyparser = require("body-parser")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const register = require("../models/registerSchema")
const secret = "SECRET"

const router = express.Router();
router.use(bodyparser())

//--------------------------------------------------------------------
//Login the registered User
router.post("/", async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check if user of the this email exists or not
        //if he exists then help him to login
        //otherwise tell him to register

        const user = await register.findOne({email:req.body.email})

        if(!user){
            res.status(400).json({
                status : "Failed",
                message : "Kindly Register first"
            })
        }

        bcrypt.compare(req.body.password, user.password, function(err, result) {
            // result == true
            if(err){
                res.status(500).json({
                    status : "Failed",
                    message : err.message
                })
            }
            if(result){
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);

                res.status(200).json({
                    status : "Success",
                    message : "Logged in Successfully",
                    token
                })
            }
            else{
                res.status(400).json({
                    status : "Failed",
                    message : "Password does not match"
                })
            }
        });

    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }
})

//--------------------------------------------------------------------

module.exports = router