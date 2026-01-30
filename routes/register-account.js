const express = require("express");
const router = express.Router();
const {connect_Db_register} = require("../config/create_account");
const Register_acc = require("../models/create_account");
const bcrypt = require("bcrypt");



// connect_Db_register()
router.post("/create_acc", async(req,res)=> {
    try {
        const plain_password = req.body.password
        const salt_rounnds = 10;
        const hashedpassword = await bcrypt.hash(plain_password,salt_rounnds);

        const accounts = await Register_acc.create({
            display_name :req.body.display_name,
            full_name: req.body.full_name,
            email_address:req.body.email_address,
            password: hashedpassword
        });
        res.redirect("/login")
        
        console.log("Successfully saved the informations")
        
    } catch (error) {
        res.json("Failed to register", err);
    }

});
module.exports = router;