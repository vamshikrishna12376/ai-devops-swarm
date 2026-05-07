const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔁 IMPORT ORCHESTRATOR
const orchestrator = require("../orchestrator/orchestrator");

// 📊 IMPORT METRICS
const metrics = require("./metrics");
const { addLog, getLogs } = require("./logs");

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
app.post("/webhook", (req, res) => {
  try {
    addLog("🔥 GitHub Webhook Triggered");

    const repo = req.body.repository?.name || "unknown";
    const commit = req.body.head_commit?.id || "latest";

    res.status(202).json({
      message: "Webhook received. Pipeline started.",
      repo,
      commit,
    });

    orchestrator
      .runPipeline(repo, commit)
      .then((result) => {
        addLog(`✅ Webhook pipeline finished: ${result.status}`);
      })
      .catch((err) => {
        console.error(err);
        addLog("❌ Webhook pipeline error");
      });
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
  res.json(getLogs());
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
