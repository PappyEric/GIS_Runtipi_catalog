import { expect, test, describe } from "bun:test";
import { appInfoSchema, dynamicComposeSchemaYaml } from '@runtipi/common/schemas';
import { type } from 'arktype';
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const getApps = async () => {
  const appsDir = await fs.promises.readdir(path.join(process.cwd(), 'apps'));

  const appDirs = appsDir.filter((app) => {
    const stat = fs.statSync(path.join(process.cwd(), 'apps', app));
    return stat.isDirectory();
  });

  return appDirs;
};

const getFile = async (app: string, file: string) => {
  const filePath = path.join(process.cwd(), 'apps', app, file);
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    return content;
  } catch (err) {
    return null;
  }
};

describe("each app should have the required files", async () => {
  const apps = await getApps();

  for (const app of apps) {
    const files = ['config.json', 'docker-compose.yml', 'metadata/logo.jpg', 'metadata/description.md'];

    for (const file of files) {
      test(`app ${app} should have ${file}`, async () => {
        const fileContent = await getFile(app, file);
        expect(fileContent).not.toBeNull();
      });
    }
  }
});

describe("each app should have a valid config.json", async () => {
  const apps = await getApps();
  const schemaWithoutUrn = appInfoSchema.omit('urn');

  for (const app of apps) {
    test(`app ${app} should have a valid config.json`, async () => {
      const fileContent = await getFile(app, 'config.json');
      const parsed = schemaWithoutUrn(JSON.parse(fileContent || '{}'));

      if (parsed instanceof type.errors) {
        console.error(`Error parsing config.json for app ${app}:`, parsed.summary);
      }

      expect(parsed instanceof type.errors).toBe(false);
    });
  }
});

describe("each app should have a valid docker-compose.yml", async () => {
  const apps = await getApps();

  for (const app of apps) {
    test(`app ${app} should have a valid docker-compose.yml`, async () => {
      const fileContent = await getFile(app, 'docker-compose.yml');
      const parsed = dynamicComposeSchemaYaml(YAML.parse(fileContent || '{}'));

      if (parsed instanceof type.errors) {
        console.error(`Error parsing docker-compose.yml for app ${app}:`, parsed.summary);
      }

      expect(parsed instanceof type.errors).toBe(false);
    });
  }
});
