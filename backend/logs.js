let logs = [];

function addLog(message) {
  logs.push({
    time: new Date().toLocaleTimeString(),
    message,
  });

  if (logs.length > 50) logs.shift();
}

function getLogs() {
  return logs;
}

module.exports = { addLog, getLogs };
