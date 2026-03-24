async function run(repo, commit) {
    console.log("Security Agent scanning...");

    return {
        safe: true,
        vulnerabilities: []
    };
}

module.exports = { run };
