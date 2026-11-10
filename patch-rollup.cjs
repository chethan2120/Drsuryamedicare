const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'node_modules', 'rollup', 'dist', 'native.js');
if (fs.existsSync(target)) {
  let content = fs.readFileSync(target, 'utf8');
  if (!content.includes("@rollup/wasm-node/dist/native.js")) {
    content = content.replace(
      "if (error instanceof Error && error.code === 'ERR_DLOPEN_FAILED') {\n\t\t\tthrow error;\n\t\t}",
      "if (error instanceof Error && error.code === 'ERR_DLOPEN_FAILED') {\n\t\t\ttry { return require('@rollup/wasm-node/dist/native.js'); } catch {}\n\t\t\tthrow error;\n\t\t}"
    );
    fs.writeFileSync(target, content, 'utf8');
    console.log('Patched rollup native.js with wasm-node fallback');
  }
}
