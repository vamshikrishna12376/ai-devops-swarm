const reviewAgent = require("../agents/review-agent");
const testAgent = require("../agents/test-agent");
const securityAgent = require("../agents/security-agent");
const deployAgent = require("../agents/deploy-agent");

const monitorAgent = require("../agents/monitor-agent");
const recoveryAgent = require("../agents/recovery-agent");

async function runPipeline(repo, commit) {

    console.log("Running AI Swarm...");

    const [review, test, security] = await Promise.all([
        reviewAgent.run(repo, commit),
        testAgent.run(repo, commit),
        securityAgent.run(repo, commit)
    ]);

    if (review.approved && test.passed && security.safe) {

        const deployment = await deployAgent.deploy(repo);

        // 🧠 Monitor after deployment
        const health = await monitorAgent.checkHealth();

        if (!health.healthy) {
            const recovery = await recoveryAgent.recover();

            return {
                status: "RECOVERED 🔧",
                deployment,
                recovery
            };
        }

        return {
            status: "DEPLOYED & HEALTHY ✅",
            deployment
        };
    }

    return {
        status: "FAILED ❌",
        details: { review, test, security }
    };
}

module.exports = { runPipeline };
