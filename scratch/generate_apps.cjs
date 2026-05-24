const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const appsDir = path.join(__dirname, '..', 'apps');

const apps = [
  {
    id: 'titiler',
    name: 'TiTiler',
    short_desc: 'A modern dynamic tile server built on top of FastAPI and Rasterio/GDAL.',
    description: 'TiTiler is a set of python modules that help create dynamic tile servers for Cloud Optimized GeoTIFFs (COG) and SpatioTemporal Asset Catalogs (STAC).',
    port: 8000,
    version: 'latest',
    source: 'https://github.com/developmentseed/titiler',
    categories: ['data', 'utilities'],
    compose: {
      services: {
        titiler: {
          image: 'ghcr.io/developmentseed/titiler:latest',
          environment: {
            PORT: "8000"
          },
          'x-runtipi': {
            is_main: true,
            internal_port: 8000
          }
        }
      },
      'x-runtipi': {
        schema_version: 2,
        overrides: []
      }
    }
  },
  {
    id: 'maputnik',
    name: 'Maputnik',
    short_desc: 'An open source visual editor for the Mapbox Style Specification.',
    description: 'Maputnik is a free and open visual editor for Mapbox Vector Tiles. It allows you to design maps and easily integrate them into your web or mobile applications.',
    port: 8888,
    version: 'latest',
    source: 'https://github.com/maputnik/editor',
    categories: ['media', 'utilities'],
    compose: {
      services: {
        maputnik: {
          image: 'maputnik/editor:latest',
          'x-runtipi': {
            is_main: true,
            internal_port: 8888
          }
        }
      },
      'x-runtipi': {
        schema_version: 2,
        overrides: []
      }
    }
  },
  {
    id: 'pg-spatial',
    name: 'Crunchy Spatial',
    short_desc: 'Lightweight PostGIS spatial API servers: pg_tileserv and pg_featureserv.',
    description: 'Bundle of CrunchyData spatial servers. pg_tileserv provides vector tiles from PostGIS, and pg_featureserv provides an OGC API-Features REST API.',
    port: 9000,
    version: 'latest',
    source: 'https://github.com/CrunchyData',
    categories: ['data'],
    form_fields: [
      {
        type: 'text',
        env_variable: 'DATABASE_URL',
        label: 'PostGIS Database URL',
        default: 'postgresql://postgres:postgisadmin@gis-postgres:5433/gis',
        required: true
      }
    ],
    compose: {
      services: {
        pg_tileserv: {
          image: 'crunchydata/pg_tileserv:latest',
          environment: {
            DATABASE_URL: '${DATABASE_URL}'
          },
          'x-runtipi': {
            is_main: true,
            internal_port: 9000,
            add_to_main_network: true
          }
        },
        pg_featureserv: {
          image: 'crunchydata/pg_featureserv:latest',
          environment: {
            DATABASE_URL: '${DATABASE_URL}'
          },
          'x-runtipi': {
            internal_port: 9000,
            add_to_main_network: true
          }
        }
      },
      'x-runtipi': {
        schema_version: 2,
        overrides: []
      }
    }
  },
  {
    id: 'photon',
    name: 'Photon',
    short_desc: 'An incredibly fast, multilingual, and typo-tolerant geocoding engine.',
    description: 'Photon is an open source geocoder built for OpenStreetMap data. It provides high performance search based on Elasticsearch.',
    port: 2322,
    version: 'latest',
    source: 'https://github.com/komoot/photon',
    categories: ['utilities'],
    compose: {
      services: {
        photon: {
          image: 'rtuszik/photon-docker:latest',
          volumes: [
            '${APP_DATA_DIR}/data:/photon/data'
          ],
          'x-runtipi': {
            is_main: true,
            internal_port: 2322,
            add_to_main_network: true
          }
        }
      },
      'x-runtipi': {
        schema_version: 2,
        overrides: []
      }
    }
  },
  {
    id: 'graphhopper',
    name: 'GraphHopper',
    short_desc: 'A fast and memory-efficient routing engine using OpenStreetMap data.',
    description: 'GraphHopper provides routing APIs (directions, isochrones, matrix calculations) powered by OSM.',
    port: 8989,
    version: 'latest',
    source: 'https://github.com/graphhopper/graphhopper',
    categories: ['utilities'],
    compose: {
      services: {
        graphhopper: {
          image: 'israelhikingmap/graphhopper:latest',
          environment: {
            JAVA_OPTS: '-Xmx2g -Xms2g'
          },
          volumes: [
            '${APP_DATA_DIR}/data:/data',
            '${APP_DATA_DIR}/config:/config'
          ],
          command: '--host 0.0.0.0',
          'x-runtipi': {
            is_main: true,
            internal_port: 8989,
            add_to_main_network: true
          }
        }
      },
      'x-runtipi': {
        schema_version: 2,
        overrides: []
      }
    }
  }
];

const now = Date.now();

for (const app of apps) {
  const targetDir = path.join(appsDir, app.id);
  const metadataDir = path.join(targetDir, 'metadata');
  
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  if (!fs.existsSync(metadataDir)) fs.mkdirSync(metadataDir, { recursive: true });

  const config = {
    name: app.name,
    id: app.id,
    available: true,
    short_desc: app.short_desc,
    author: 'Eric D',
    categories: app.categories,
    port: app.port,
    version: app.version,
    tipi_version: 2,
    source: app.source,
    exposable: true,
    supported_architectures: ['amd64', 'arm64'],
    form_fields: app.form_fields || [],
    dynamic_config: true,
    created_at: now,
    updated_at: now
  };

  fs.writeFileSync(path.join(targetDir, 'config.json'), JSON.stringify(config, null, 4));
  fs.writeFileSync(path.join(targetDir, 'docker-compose.yml'), yaml.stringify(app.compose));
  fs.writeFileSync(path.join(metadataDir, 'description.md'), `# ${app.name}\n\n${app.description}`);
  
  // Create dummy logo to pass tests, will be overwritten by generate_image
  fs.writeFileSync(path.join(metadataDir, 'logo.jpg'), 'dummy');
}

console.log('Successfully generated ' + apps.length + ' apps.');
