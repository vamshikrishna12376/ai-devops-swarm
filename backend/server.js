const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
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
app.post("/webhook", async (req, res) => {
    console.log("🔥 GitHub Webhook Triggered!");

    const repo = req.body.repository?.name || "unknown";
    const commit = req.body.head_commit?.id || "latest";

    const result = await orchestrator.runPipeline(repo, commit);

    res.json({ message: "Pipeline triggered", result });
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
