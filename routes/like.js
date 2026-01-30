const express = require("express");
const router = express.Router();
const Gunaso_Like = require("../models/like_gunaso");
const isLoggedIn = require("../middlewares/isloggedin");
const Gunaso = require("../models/submit_gunaso");


router.post("/api/gunaso/:id/like", isLoggedIn, async (req, res) => {
    try {
        const gunasoId = req.params.id;
        const userId =  req.session.user?.id;
        const liked = await Gunaso_Like.findOne({gunasoId , userId});
        if(liked){
            await Gunaso_Like.deleteOne({ _id: liked._id });
            await Gunaso.findByIdAndUpdate(gunasoId, { $inc: { likeCount: -1 } });
        }
        else{
            const newLike  = new Gunaso_Like({gunasoId, userId});
            await newLike.save();
            await Gunaso.findByIdAndUpdate(gunasoId, { $inc: { likeCount: 1 } });
        }
    } catch (error) {
        console.error("Error processing like:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
