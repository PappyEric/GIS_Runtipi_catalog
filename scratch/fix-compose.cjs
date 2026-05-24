const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const appsDir = path.join(__dirname, '..', 'apps');
const apps = fs.readdirSync(appsDir);

let modified = 0;
for (const app of apps) {
  const composePath = path.join(appsDir, app, 'docker-compose.yml');
  if (fs.existsSync(composePath)) {
    const content = fs.readFileSync(composePath, 'utf8');
    const doc = yaml.parse(content);
    
    let changed = false;
    
    // Ensure root x-runtipi has overrides: []
    if (!doc['x-runtipi'].overrides) {
      doc['x-runtipi'].overrides = [];
      changed = true;
    }

    // Convert internal_port back to number if it is string
    if (doc.services) {
      for (const serviceName of Object.keys(doc.services)) {
        const service = doc.services[serviceName];
        if (service['x-runtipi'] && typeof service['x-runtipi'].internal_port === 'string') {
          service['x-runtipi'].internal_port = parseInt(service['x-runtipi'].internal_port, 10);
          changed = true;
        }
      }
    }

    if (changed) {
      fs.writeFileSync(composePath, yaml.stringify(doc));
      modified++;
    }
  }
}
console.log('Modified ' + modified + ' files.');
