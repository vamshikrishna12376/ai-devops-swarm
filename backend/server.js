const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔁 IMPORT ORCHESTRATOR
const orchestrator = require("../orchestrator/orchestrator");

// 📊 IMPORT METRICS
const metrics = require("./metrics");

// 🧾 LOG STORAGE
let logs = [];

// ➕ ADD LOG FUNCTION
function addLog(message) {
  logs.push({
    time: new Date().toLocaleTimeString(),
    message,
  });

  if (logs.length > 50) logs.shift(); // keep last 50 logs
}

// 🌐 ROOT
app.get("/", (req, res) => {
  res.send("AI DevOps Swarm Running 🚀");
});

// 🚀 MANUAL TRIGGER
app.post("/trigger", async (req, res) => {
  try {
    addLog("🚀 Pipeline triggered");

    const { repo, commit } = req.body;

    const result = await orchestrator.runPipeline(repo, commit);

    addLog(`✅ Pipeline finished: ${result.status}`);

    res.json(result);
  } catch (err) {
    console.error(err);
    addLog("❌ Pipeline error");

    res.status(500).json({ error: "Pipeline failed" });
  }
});

// 🔗 GITHUB WEBHOOK
app.post("/webhook", async (req, res) => {
  try {
    addLog("🔥 GitHub Webhook Triggered");

    const repo = req.body.repository?.name || "unknown";
    const commit = req.body.head_commit?.id || "latest";

    const result = await orchestrator.runPipeline(repo, commit);

    res.json({ message: "Pipeline triggered", result });
  } catch (err) {
    console.error(err);
    addLog("❌ Webhook error");

    res.status(500).json({ error: "Webhook failed" });
  }
});

// 📊 METRICS API
app.get("/metrics", (req, res) => {
  res.json(metrics.getMetrics());
});

// 🧾 LOGS API
app.get("/logs", (req, res) => {
  res.json(logs);
});

// ❌ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// 🚀 START SERVER
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});

// 📤 EXPORT LOG FUNCTION
module.exports = { addLog };
