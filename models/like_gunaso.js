const mongoose = require("mongoose");

const gunasoLikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    gunasoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gunaso_Submit",
        required: true
    }
}, { timestamps: true });

// Ensure a user can like a submission only once
gunasoLikeSchema.index({ userId: 1, gunasoId: 1 }, { unique: true });

module.exports = mongoose.model("Gunaso_Like", gunasoLikeSchema);
