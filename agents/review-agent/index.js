const { addLog } = require("../../backend/logs");
function validateInputs(repo, commit) {
    if (!repo || typeof repo !== "string") {
        throw new TypeError("Invalid repo: expected non-empty string");
    }

    if (!commit || typeof commit !== "string") {
        throw new TypeError("Invalid commit: expected non-empty string");
    }
}

async function run(repo, commit) {
    try {
        validateInputs(repo, commit);
        addLog(`Review Agent started (repo=${repo}, commit=${commit})`);

        return {
            approved: true,
            issues: []
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        addLog(`Review Agent failed: ${message}`);

        return {
            approved: false,
            issues: [message]
        };
    }
}

module.exports = { run };
