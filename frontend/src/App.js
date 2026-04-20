import React, { useState } from "react";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const triggerPipeline = async () => {
    setLoading(true);
<button onClick={fetchMetrics}>View Metrics</button>

    const res = await fetch("http://localhost:3000/trigger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repo: "demo", commit: "123" }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };
const fetchMetrics = async () => {
  const res = await fetch("http://localhost:3000/metrics");
  const data = await res.json();
  setMetrics(data);
};
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🚀 AI DevOps Swarm Dashboard</h1>

      <button onClick={triggerPipeline} style={btn}>
        Run Pipeline
      </button>

      {loading && <p>Running AI Swarm...</p>}

      {result && (
        <div style={card}>
          <h2>Status: {result.status}</h2>

          {result.deployment && (
            <p>🌐 URL: {result.deployment.url}</p>
          )}

          {result.recovery && (
            <p>🔧 Recovery: {result.recovery.recovered ? "Success" : "Failed"}</p>
          )}

          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const btn = {
  padding: "10px 20px",
  fontSize: "16px",
  marginTop: "10px",
  cursor: "pointer",
};

const card = {
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  background: "#f9f9f9",
};
<button onClick={fetchMetrics}>View Metrics</button>

{metrics && (
  <div style={card}>
    <h3>📊 Metrics</h3>
    <p>Total Runs: {metrics.totalRuns}</p>
    <p>Success Rate: {metrics.successRate}</p>
    <p>MTAR: {metrics.MTAR}</p>
  </div>
)}
export default App;
