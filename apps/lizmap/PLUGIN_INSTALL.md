# Lizmap Plugin Installation

The Lizmap server plugin must be manually installed in the `plugins` directory.

## Installation Steps

1. Download the latest Lizmap server plugin:
   ```bash
   wget https://github.com/3liz/qgis-lizmap-server-plugin/archive/refs/heads/master.zip
   ```

2. Extract to your Runtipi app data directory:
   ```bash
   unzip master.zip
   mv qgis-lizmap-server-plugin-master /path/to/runtipi/app-data/lizmap/plugins/lizmap_server
   ```

3. Set permissions:
   ```bash
   chmod -R 755 /path/to/runtipi/app-data/lizmap/plugins
   ```

4. Restart the Lizmap application in Runtipi

## Verification

After installation, check the Lizmap admin panel under "QGIS Server" to verify the plugin is detected.
