
import fs from 'fs/promises';
import path from 'path';

const appsDir = path.join(process.cwd(), 'apps');

async function checkPorts() {
    const apps = await fs.readdir(appsDir);
    const ports = {};
    for (const app of apps) {
        const configPath = path.join(appsDir, app, 'config.json');
        try {
            const content = await fs.readFile(configPath, 'utf-8');
            const json = JSON.parse(content);
            if (json.port) {
                console.log(`${app}: ${json.port}`);
                if (ports[json.port]) {
                    console.error(`CONFLICT: ${app} and ${ports[json.port]} share port ${json.port}`);
                }
                ports[json.port] = app;
            } else {
                console.log(`${app}: NO PORT`);
            }
        } catch (e) {
            // ignore
        }
    }
}

checkPorts();
