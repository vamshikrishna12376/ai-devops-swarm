const express = require("express");
const app = express();

app.use(express.json());

const orchestrator = require("../orchestrator/orchestrator");

app.get("/", (req, res) => {
    res.send("AI DevOps Swarm Running 🚀");
});

app.post("/trigger", async (req, res) => {
    const { repo, commit } = req.body;

    console.log("Pipeline triggered...");

    const result = await orchestrator.runPipeline(repo, commit);

    res.json(result);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
const cors = require("cors");app.use(cors());
});
