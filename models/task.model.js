const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    quantityMember: {
        type: Number,
        default: 1
    },

        status: {
        type: Boolean,
        default: false
    },

    startDate: {
        type: Date
    },

    endDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);