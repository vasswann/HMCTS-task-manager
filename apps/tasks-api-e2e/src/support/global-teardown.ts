module.exports = async function () {
  const server = globalThis.__API_PROCESS__;
  if (server) {
    server.kill();
  }
  console.log('\nTearing down API...\n');
};
