const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const appDir = '/app';
const rootEnvYamlPath = path.join(appDir, 'example.env.yaml');
const appEnvYamlPath = path.join(appDir, 'env.yaml');

// Ensure /app directory exists
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

// Read the root env.yaml as template
const template = yaml.load(fs.readFileSync(rootEnvYamlPath, 'utf8'));

// Replace values with environment variables if available
function replaceWithEnv(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = replaceWithEnv(obj[key]);
    } else {
      result[key] = process.env[key] !== undefined ? process.env[key] : obj[key];
    }
  }
  return result;
}

const finalEnv = replaceWithEnv(template);

// Write the new env.yaml to /app (create if doesn't exist)
fs.writeFileSync(appEnvYamlPath, yaml.dump(finalEnv), 'utf8');
console.log(`Generated ${appEnvYamlPath}`);
