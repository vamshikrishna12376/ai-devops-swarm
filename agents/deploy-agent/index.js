const { exec } = require("child_process");

function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(stderr);
                reject(error);
            } else {
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
}

async function deploy(repo) {
    console.log("🚀 Deployment Agent starting...");

    try {
        // Build Docker image
        await runCommand("docker build -t ai-swarm-app .");

        // Stop old container (ignore error if not exists)
        await runCommand("docker stop swarm-container || true");

        // Remove old container
        await runCommand("docker rm swarm-container || true");

        // Run new container
        await runCommand("docker run -d -p 4000:3000 --name swarm-container ai-swarm-app");

        return { deployed: true, url: "http://localhost:4000" };

    } catch (err) {
        return { deployed: false, error: err.message };
    }
}

module.exports = { deploy };
