const { execSync } = require('child_process');
const path = require('path');

const traceFile = path.resolve('./test-results/traces/trace_1.trace');
console.log(`Opening trace file: ${traceFile}`);

try {
  execSync(`node_modules/.bin/playwright show-trace "${traceFile}"`, {
    stdio: 'inherit',
    cwd: __dirname
  });
} catch (error) {
  console.error('Error opening trace viewer:', error.message);
}
