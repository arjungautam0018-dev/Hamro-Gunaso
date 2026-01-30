const express = require("express");
const router = express.Router();

const Gunaso = require("../models/submit_gunaso");
const Comment = require("../models/create_comment");
const isloggedin = require("../middlewares/isloggedin");
const accounts = require("../models/create_account");

router.post("/api/gunaso/:id/comment", isloggedin, async(req,res)=>{
    try {
        const gunasoId = req.params.id;
        const userId = req.session.user?.id;
        const commentText = req.body.commentText;
console.log("COMMENT PARAM ID:", req.params.id);

        const newComment = new Comment({
            gunasoId: gunasoId,
            userId: userId,
            commentText: commentText
        });
        await newComment.save();

        await Gunaso.findByIdAndUpdate(gunasoId, { $inc: { commentCount: 1 } });
    res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.log("Error adding comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/api/gunaso/:id/comments", async(req,res)=>{
    try {
        const gunasoId = req.params.id;
        const comments = await Comment.find({ gunasoId: gunasoId })
        .populate("userId", "display_name")
        .sort({ createdAt: -1 });
        res.json(comments);
        console.log("Fetched Comments:", comments);

    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;