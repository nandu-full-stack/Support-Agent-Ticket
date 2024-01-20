const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const agentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    description: {
        type: String
    },
    active: {
        type: Boolean
    },
    dateCreated: {
        type: Date
    },
    lastAssigned: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Agent", agentSchema);