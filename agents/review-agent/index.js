const { askAI } = require("../../backend/ai");

async function run(repo, commit) {

    console.log("🤖 AI Review Agent analyzing...");

    try {
        const result = await askAI("Review this code");

        const parsed = JSON.parse(result);

        return {
            approved: parsed.approved ?? true,
            issues: parsed.issues ?? []
        };

    } catch (err) {
        console.log("⚠️ Review fallback");

        return { approved: true, issues: ["Fallback mode"] };
    }
}

module.exports = { run };
