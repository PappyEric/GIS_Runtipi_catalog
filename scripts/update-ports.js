
import fs from 'fs/promises';
import path from 'path';

const appsDir = path.join(process.cwd(), 'apps');

const portUpdates = {
    'gis-postgres': 5433,
    'geoserver': 8081,
    'lizmap': 8082,
    'geonode': 8001,
    'mergin-maps': 8002,
    'pgadmin': 8003,
    'potree': 8004,
    'vector-admin': 3002,
    'martin': 3003,
    'metabase': 3004,
    'postgrest': 3005,
    'qgis-web': 3006
};

async function updatePorts() {
    for (const [appName, newPort] of Object.entries(portUpdates)) {
        const configPath = path.join(appsDir, appName, 'config.json');
        try {
            const content = await fs.readFile(configPath, 'utf-8');
            const json = JSON.parse(content);
            if (json.port !== newPort) {
                console.log(`Updating ${appName} port from ${json.port} to ${newPort}`);
                json.port = newPort;
                await fs.writeFile(configPath, JSON.stringify(json, null, 4));
            } else {
                console.log(`${appName} already on port ${newPort}`);
            }
        } catch (e) {
            console.error(`Failed to update ${appName}: ${e.message}`);
        }
    }
}

updatePorts();
