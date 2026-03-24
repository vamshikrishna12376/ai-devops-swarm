const http = require("http");

function checkHealth() {
    return new Promise((resolve) => {

        http.get("http://localhost:4000", (res) => {
            if (res.statusCode === 200) {
                resolve({ healthy: true });
            } else {
                resolve({ healthy: false });
            }
        }).on("error", () => {
            resolve({ healthy: false });
        });

    });
}

module.exports = { checkHealth };
