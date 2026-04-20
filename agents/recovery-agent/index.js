const { exec } = require("child_process");
const path = require("path");

function runCommand(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject({ error: err, stderr });
            else resolve(stdout);
        });
    });
}

async function recover() {
    console.log("⚠️ Recovery Agent triggered...");

    try {
        const scriptPath = path.join(__dirname, "../../scripts/recover.sh");
        const output = await runCommand(`bash ${scriptPath}`);
        
        console.log("Recovery output:", output);
        return { recovered: true, details: output };

    } catch (err) {
        console.error("Recovery failed:", err.stderr || err.error);
        return { recovered: false, error: err.stderr || "Unknown script failure" };
    }
}

module.exports = { recover };
