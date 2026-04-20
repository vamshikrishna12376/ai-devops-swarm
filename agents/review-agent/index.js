const { askAI } = require("../../backend/ai");

async function run(repo, commit) {
    console.log(`🤖 AI Review Agent analyzing commit ${commit} in ${repo}...`);

    try {
        // In a real scenario, you would fetch the git diff here
        const prompt = `Review the latest code changes for repository: ${repo}, commit hash: ${commit}. Identify any logic errors, code smells, or performance bottlenecks. Return the result in strict JSON format.`;
        
        const result = await askAI(prompt);
        const parsed = JSON.parse(result);

        return {
            approved: parsed.approved ?? false, // Default to FALSE if missing
            issues: parsed.issues ?? []
        };

    } catch (err) {
        console.error("⚠️ Review Agent failed to process:", err.message);
        
        // Fail-safe: Reject the pipeline if the review agent crashes
        return { 
            approved: false, 
            issues: ["Agent crash or AI service unavailable. Pipeline halted for safety."] 
        };
    }
}

module.exports = { run };
