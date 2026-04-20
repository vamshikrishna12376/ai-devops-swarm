const fs = require("fs");
const path = require("path");

const metricsFile = path.join(__dirname, "metrics.json");

// Default state
let metrics = {
    totalRuns: 0,
    success: 0,
    failures: 0,
    recoveryTimes: []
};

// Load existing metrics on startup
if (fs.existsSync(metricsFile)) {
    try {
        const data = fs.readFileSync(metricsFile, "utf8");
        metrics = JSON.parse(data);
    } catch (err) {
        console.error("Error reading metrics.json:", err);
    }
}

function saveMetrics() {
    fs.writeFileSync(metricsFile, JSON.stringify(metrics, null, 2));
}

function recordSuccess() {
    metrics.totalRuns++;
    metrics.success++;
    saveMetrics();
}

function recordFailure() {
    metrics.totalRuns++;
    metrics.failures++;
    saveMetrics();
}

function recordRecovery(time) {
    metrics.recoveryTimes.push(time);
    saveMetrics();
}

function getMetrics() {
    const successRate = metrics.totalRuns === 0 
        ? 0 
        : ((metrics.success / metrics.totalRuns) * 100).toFixed(2);

    const mtar = metrics.recoveryTimes.length === 0 
        ? 0 
        : (metrics.recoveryTimes.reduce((a, b) => a + b, 0) / metrics.recoveryTimes.length).toFixed(2);

    return {
        ...metrics,
        successRate: successRate + "%",
        MTAR: mtar + " sec"
    };
}

module.exports = {
    recordSuccess,
    recordFailure,
    recordRecovery,
    getMetrics
};
