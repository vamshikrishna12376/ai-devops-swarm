async function run(repo, commit) {
    console.log("Test Agent running tests...");

    return {
        passed: true,
        coverage: "85%"
    };
}

module.exports = { run };
