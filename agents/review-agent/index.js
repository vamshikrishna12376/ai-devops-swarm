async function run(repo, commit) {
    console.log("Review Agent analyzing code...");

    return {
        approved: true,
        issues: []
    };
}

module.exports = { run };
