async function askAI(prompt) {

    console.log("🤖 Simulated AI running...");

    if (prompt.toLowerCase().includes("review")) {
        return JSON.stringify({
            approved: true,
            issues: ["No critical issues"]
        });
    }

    if (prompt.toLowerCase().includes("test")) {
        return JSON.stringify({
            passed: true,
            coverage: "85%"
        });
    }

    if (prompt.toLowerCase().includes("security")) {
        return JSON.stringify({
            safe: true,
            vulnerabilities: []
        });
    }

    return JSON.stringify({
        approved: true,
        passed: true,
        safe: true
    });
}

module.exports = { askAI };
