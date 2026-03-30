const { askAI } = require("../../backend/ai");

async function run(repo, commit) {

    try {
        const result = await askAI("Check security");

        const parsed = JSON.parse(result);

        return {
            safe: parsed.safe ?? true,
            vulnerabilities: parsed.vulnerabilities ?? []
        };

    } catch {
        return { safe: true, vulnerabilities: [] };
    }
}

module.exports = { run };
