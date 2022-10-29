const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/basicFMCG")
const bodyparser = require("body-parser")
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const register = require("../models/registerSchema")

const router = express.Router();
router.use(bodyparser())

router.get("/", (req, res) => {
    res.send("Hello from Router")
})
//----------------------------------------------------------------------------------------
//register an user on the site
router.post("/", body("email").isEmail(), body('password').isLength({ min: 5 }), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            const data = await register.create({
                name : req.body.name,
                email : req.body.email,
                password : hash
            })
            res.json({
                status: "Success",
                message : "User Registered Successfully",
                data
            })
        });

    } catch (error) {
        res.json({
            status: "Failed",
            message: error.message
        })
    }
})
//-------------------------------------------------------------------------------------
module.exports = router
