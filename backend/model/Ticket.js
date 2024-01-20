const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    topic: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    dateCreated: {
        type: Date
    },
    type: {
        type: String,
        required:true
    },
    severity:{
      type:String,
      required:true
    },
    assignedTo: { //Id from rounf robin
        type: String
    },
    status: { //New,Assigned,Resolved
        type: String
    },
    resolvedOn:{
        type:Date
    }

})

module.exports = mongoose.model("Ticket",ticketSchema);