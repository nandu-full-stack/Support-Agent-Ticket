const express = require("express");
const mongoose = require("mongoose");
const agentrouter = require("./routes/agentRoutes.js");
const ticketrouter = require("./routes/ticketRoutes.js");
const cors = require('cors'); 
const path = require("path");


const app = express();

app.use(cors()); 
app.use(express.json());

mongoose.connect('mongodb+srv://Nandu:Orblnat23mPIJCFI@cluster0.v9kmn1r.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/api", agentrouter);
app.use("/api", ticketrouter);


app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

app.listen("5000", () => {
  console.log("Server is running")
});