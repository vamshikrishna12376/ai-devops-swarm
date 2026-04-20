const reviewAgent = require("../agents/review-agent");
const testAgent = require("../agents/test-agent");
const securityAgent = require("../agents/security-agent");
const deployAgent = require("../agents/deploy-agent");
const monitorAgent = require("../agents/monitor-agent");
const recoveryAgent = require("../agents/recovery-agent");

// Removed duplicate metrics declaration
const metrics = require("../backend/metrics"); 

async function runPipeline(repo, commit) {
    const startTime = Date.now();
    console.log("Running AI Swarm...");

    const [review, test, security] = await Promise.all([
        reviewAgent.run(repo, commit),
        testAgent.run(repo, commit),
        securityAgent.run(repo, commit)
    ]);

    if (review.approved && test.passed && security.safe) {
        const deployment = await deployAgent.deploy(repo);
        const health = await monitorAgent.checkHealth();

        if (!health.healthy) {
            const recoveryStart = Date.now();
            const recovery = await recoveryAgent.recover();
            const recoveryTime = (Date.now() - recoveryStart) / 1000;

            metrics.recordRecovery(recoveryTime);
            metrics.recordSuccess();

            return {
                status: "RECOVERED 🔧",
                deployment,
                recovery
            };
        }

        metrics.recordSuccess();

        return {
            status: "DEPLOYED & HEALTHY ✅",
            deployment
        };
    }

    metrics.recordFailure();

    return {
        status: "FAILED ❌"
    };
}

// EXPORT REQUIRED for backend/server.js to use it!
module.exports = { runPipeline };
