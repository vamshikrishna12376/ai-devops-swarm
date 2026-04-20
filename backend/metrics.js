let metrics = {
    totalRuns: 0,
    success: 0,
    failures: 0,
    recoveryTimes: []
};

function recordSuccess() {
    metrics.totalRuns++;
    metrics.success++;
}

function recordFailure() {
    metrics.totalRuns++;
    metrics.failures++;
}

function recordRecovery(time) {
    metrics.recoveryTimes.push(time);
}

function getMetrics() {
    const successRate =
        metrics.totalRuns === 0
            ? 0
            : ((metrics.success / metrics.totalRuns) * 100).toFixed(2);

    const mtar =
        metrics.recoveryTimes.length === 0
            ? 0
            : (
                  metrics.recoveryTimes.reduce((a, b) => a + b, 0) /
                  metrics.recoveryTimes.length
              ).toFixed(2);

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
