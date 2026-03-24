const { exec } = require("child_process");

function runCommand(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(stderr);
            else resolve(stdout);
        });
    });
}

async function recover() {
    console.log("⚠️ Recovery Agent triggered...");

    try {
        await runCommand("docker restart swarm-container");

        return { recovered: true };

    } catch (err) {
        return { recovered: false, error: err };
    }
}

module.exports = { recover };
