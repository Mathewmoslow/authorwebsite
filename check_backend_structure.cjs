const fs = require("fs");
const path = require("path");

const expected = {
  server: {
    ".env": true,
    "index.js": true,
    "package.json": true,
    node_modules: false, // optional, added after install
  },
};

function checkStructure(basePath, structure) {
  for (const item in structure) {
    const fullPath = path.join(basePath, item);
    const exists = fs.existsSync(fullPath);

    if (structure[item] === true && !exists) {
      console.log(`❌ MISSING: ${fullPath}`);
    } else if (structure[item] === true) {
      console.log(`✅ OK: ${fullPath}`);
    } else if (typeof structure[item] === "object") {
      if (!exists) {
        console.log(`❌ MISSING DIR: ${fullPath}`);
      } else {
        console.log(`📁 CHECKING DIR: ${fullPath}`);
        checkStructure(fullPath, structure[item]);
      }
    }
  }
}

checkStructure(".", expected);
