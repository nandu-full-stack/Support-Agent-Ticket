const express = require("express");
const Ticket = require("../model/Ticket");
const Agent = require("../model/Agent");

const router = express.Router();

router.post("/support-tickets", async (req, res) => {
    try {
        const activeAgents = await Agent.find({ active: true });

        let nextAgent;
        for (const agent of activeAgents) {
            if (agent.lastAssigned) {
                agent.lastAssigned = false;
                await agent.save();
                const nextAgentIndex = (activeAgents.indexOf(agent) + 1) % activeAgents.length;
                nextAgent = activeAgents[nextAgentIndex];
                nextAgent.lastAssigned = true;
                await nextAgent.save();
                break;
            }
        }

        if (!nextAgent && activeAgents.length > 0) {
            const firstAgent = activeAgents[0];
            firstAgent.lastAssigned = true;
            await firstAgent.save();
            nextAgent = firstAgent;
        }

        const newTicket = new Ticket({
            topic: req.body.topic,
            description: req.body.description,
            dateCreated: new Date(),
            type: req.body.type,
            severity: req.body.severity,
            assignedTo: nextAgent ? nextAgent._id : null,
            status: nextAgent ? "Assigned" : "New",
            resolvedOn: null,
        });

        const ticket = await newTicket.save();
        res.status(200).json({ message: 'Ticket created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/support-tickets", async (req, res) => {
    try {

        const filter = {};
        if (req.query.status !== undefined) {
            filter.status = req.query.status;
        }

        if (req.query.assignedTo !== undefined) {
            filter.assignedTo = req.query.assignedTo;
        }

        if (req.query.severity !== undefined) {
            filter.severity = req.query.severity;
        }

        if (req.query.type !== undefined) {
            filter.type = req.query.type;
        }

        const sortBy = req.query.sortBy || "dateCreated";
        const sortOrder = req.query.sortOrder || "asc";

        const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

        const tickets = await Ticket.find(filter).sort(sort);

        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;