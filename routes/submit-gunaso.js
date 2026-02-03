const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploads");
const Gunaso_Submit = require("../models/submit_gunaso");


const isLoggedIn = require("../middlewares/isloggedin");




router.post(
    "/gunaso",
    isLoggedIn,
    upload.array("files", 6),
    async (req,res) => {
        const filesData = req.files.map(file => ({
            originalName: file.originalName,
            fileName : file.fileName,
            path : file.path,
            mimetype: file.mimetype,
            size: file.size,
        }));
        const gunaso = await Gunaso_Submit.create({
            category:req.body.category,
            description:req.body.description,
            files:filesData
        });

    
        res.redirect("/homepage")
    }
)

// Fetch logic
router.get("/gunaso", async(req,res)=> {
    try {
        const data = await Gunaso_Submit
        .find()
        .sort({createdAt:-1})
        .lean();
        
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch data" });
    }
});


// Fetching single gunaso detail
router.get("/api/gunaso/:id", async(req,res)=>{
    try {
        const gunasoId = req.params.id;
        const gunaso = await Gunaso_Submit.findById(gunasoId).lean();
        if(!gunaso) return res.status(400).json({message:"Gunaso not found"})
        res.json(gunaso);
    } catch (error) {
        res.status(500).json({message:"Failed to fetch gunaso detail"});
    }
});

router.delete("/api/gunaso/:id" , async(req,res)=>{
    try {
        const gunasoId = req.params.id;
        const deleteGunaso = await Gunaso_Submit.findByIdAndDelete(gunasoId);
        if(!deleteGunaso) return res.status(400).json({message:"Gunaso not found"});
        res.json({message:"Gunaso deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Failed to delete gunaso"});
    }
});

module.exports = router;