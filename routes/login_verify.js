const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Register_acc = require("../models/create_account");
console.log("✅ login_verify router file loaded");

router.post("/login_verify", async(req,res)=> {
    try {
        console.log("🔥 LOGIN HIT", req.body);
        const {email_address , password} = req.body;

        const user = await Register_acc.findOne({email_address});
        if(!user){
            return res.status(401).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message: "Passwords do not match "})
        }

        // Create session

        req.session.user= {
            id: user._id,
            email:user.email_address,
            display_name:user.display_name,
        };
        console.log("Login succesfull, session created for the user", email_address, user._id);
        res.redirect("/homepage")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
});
module.exports = router;