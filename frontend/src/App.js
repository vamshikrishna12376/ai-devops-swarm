import React, { useState } from "react";

function App() {
  const [result, setResult] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const triggerPipeline = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:3000/trigger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repo: "demo", commit: "123" }),
    });

    const data = await res.json();
    setResult(data);

    await fetchMetrics();

    setLoading(false);
  };

  const fetchMetrics = async () => {
    const res = await fetch("http://localhost:3000/metrics");
    const data = await res.json();
    setMetrics(data);
  };

  return (
    <div style={container}>
      <h1>🚀 AI DevOps Swarm Dashboard</h1>

      <button style={btn} onClick={triggerPipeline}>
        Run Pipeline
      </button>

      {loading && <p>Running AI Swarm...</p>}

      {/* PIPELINE RESULT */}
      {result && (
        <div style={card}>
          <h2>Status: {result.status}</h2>

          {result.deployment && (
            <p>🌐 URL: {result.deployment.url}</p>
          )}

          {result.recovery && (
            <p>🔧 Recovery: {result.recovery.recovered ? "Success" : "Failed"}</p>
          )}
        </div>
      )}

      {/* METRICS DASHBOARD */}
      {metrics && (
        <div style={metricsContainer}>
          <Metric title="Total Runs" value={metrics.totalRuns} />
          <Metric title="Success Rate" value={metrics.successRate} />
          <Metric title="MTAR" value={metrics.MTAR} />
        </div>
      )}
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div style={metricCard}>
      <h3>{title}</h3>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

/* STYLES */

const container = {
  padding: "30px",
  fontFamily: "Arial",
  textAlign: "center",
};

const btn = {
  padding: "12px 25px",
  fontSize: "16px",
  cursor: "pointer",
  marginBottom: "20px",
};

const card = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "10px",
  background: "#f5f5f5",
};

const metricsContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "30px",
};

const metricCard = {
  padding: "20px",
  borderRadius: "10px",
  background: "#e3f2fd",
  width: "150px",
};

export default App;
