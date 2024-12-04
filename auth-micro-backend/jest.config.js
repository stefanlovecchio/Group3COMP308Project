module.exports = {
    testEnvironment: 'node', // Ensures the environment is Node.js
    detectOpenHandles: true, // Helps detect asynchronous operations causing the hang
    forceExit: true, // Forces Jest to exit after tests complete
    testTimeout: 30000, // Sets a global timeout for each test (30 seconds)
  };
  