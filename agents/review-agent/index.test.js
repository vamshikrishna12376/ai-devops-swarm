const assert = require("node:assert/strict");
const test = require("node:test");
const Module = require("node:module");

function loadRunWithMockedAddLog(addLogImpl) {
    const originalLoad = Module._load;
    const reviewAgentPath = require.resolve("./index.js");
    delete require.cache[reviewAgentPath];

    Module._load = function patchedLoad(request, parent, isMain) {
        if (request === "../../backend/logs") {
            return { addLog: addLogImpl };
        }

        return originalLoad.apply(this, [request, parent, isMain]);
    };

    try {
        return require("./index.js").run;
    } finally {
        Module._load = originalLoad;
    }
}

test("returns approved=true with no issues for valid inputs", async () => {
    const logs = [];
    const run = loadRunWithMockedAddLog((message) => logs.push(message));

    const result = await run("my-repo", "abc123");

    assert.deepEqual(result, {
        approved: true,
        issues: []
    });
    assert.equal(logs.length, 1);
    assert.match(logs[0], /^Review Agent started \(repo=my-repo, commit=abc123\)$/);
});

test("returns approved=false when repo is invalid", async () => {
    const logs = [];
    const run = loadRunWithMockedAddLog((message) => logs.push(message));

    const result = await run("", "abc123");

    assert.equal(result.approved, false);
    assert.deepEqual(result.issues, ["Invalid repo: expected non-empty string"]);
    assert.equal(logs.length, 1);
    assert.match(logs[0], /^Review Agent failed: Invalid repo: expected non-empty string$/);
});

test("returns approved=false when commit is invalid", async () => {
    const logs = [];
    const run = loadRunWithMockedAddLog((message) => logs.push(message));

    const result = await run("my-repo", null);

    assert.equal(result.approved, false);
    assert.deepEqual(result.issues, ["Invalid commit: expected non-empty string"]);
    assert.equal(logs.length, 1);
    assert.match(logs[0], /^Review Agent failed: Invalid commit: expected non-empty string$/);
});
