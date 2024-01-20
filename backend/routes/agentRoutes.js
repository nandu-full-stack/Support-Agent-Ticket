const express = require("express");
const Agent = require("../model/Agent");

const router = express.Router();

router.post("/support-agents", async (req, res) => {
    try {
        const newAgent = new Agent({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            description: req.body.description,
            active: true,
            dateCreated: new Date()
        })

        const agent = await newAgent.save();
        res.status(200).json({ message: 'Agent created successfully' });

    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            const duplicateField = Object.keys(error.keyPattern)[0];
            const duplicateValue = error.keyValue[duplicateField];
            res.status(400).json({
                error: `Duplicate key error. The ${duplicateField} '${duplicateValue}' is already in use.`,
            });
        } else {
            console.log(error)
            res.status(500).json({ error: error.message});
        }  
    }
});


module.exports = router;