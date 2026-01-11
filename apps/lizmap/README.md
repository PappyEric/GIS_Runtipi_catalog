# Lizmap QGIS Server Plugin Installation

The Lizmap server plugin must be manually installed for full functionality.

## Installation via Portainer (Recommended for GUI users)

1. **Open Portainer** and navigate to your Runtipi stack
2. **Find the `lizmap-init` container** in the container list
3. **Click on the container name** to open its details
4. **Click "Console"** in the top menu
5. **Select "Connect"** with `/bin/sh` as the shell
6. **Run these commands** in the console:

```sh
cd /srv/plugins
wget https://github.com/3liz/qgis-lizmap-server-plugin/archive/refs/heads/master.zip -O lizmap.zip
unzip lizmap.zip
mv qgis-lizmap-server-plugin-master lizmap_server
chmod -R 777 lizmap_server
rm lizmap.zip
echo "Plugin installed successfully!"
```

7. **Restart the Lizmap app** in Runtipi

## Installation via SSH

If you prefer SSH, run these commands on your Runtipi server:

```bash
# Navigate to your Runtipi app data directory
cd /path/to/runtipi/app-data/lizmap/plugins

# Download and extract the Lizmap server plugin
wget https://github.com/3liz/qgis-lizmap-server-plugin/archive/refs/heads/master.zip
unzip master.zip
mv qgis-lizmap-server-plugin-master lizmap_server
chmod -R 755 lizmap_server
rm master.zip
```

## Installation via Docker Exec

Alternatively, you can use Docker CLI:

```bash
# Get the container ID
docker ps | grep lizmap-init

# Execute commands in the container
docker exec -it <container-id> sh -c "cd /srv/plugins && \
  wget https://github.com/3liz/qgis-lizmap-server-plugin/archive/refs/heads/master.zip -O lizmap.zip && \
  unzip lizmap.zip && \
  mv qgis-lizmap-server-plugin-master lizmap_server && \
  chmod -R 777 lizmap_server && \
  rm lizmap.zip"
```

## Verification

1. Restart the Lizmap app in Runtipi
2. Log into Lizmap Web Client at `http://your-server:8082`
   - **Username**: `admin`
   - **Password**: `admin` (change on first login)
3. Go to **Admin** → **QGIS Server Information**
4. Verify that "Lizmap server plugin" shows a green checkmark

## Troubleshooting

**Plugin not detected?**
- Ensure the directory structure is: `/srv/plugins/lizmap_server/metadata.txt`
- Check in Portainer console: `ls -la /srv/plugins/lizmap_server/`
- Verify the plugin files are present: `cat /srv/plugins/lizmap_server/metadata.txt`
- Restart the entire app (Uninstall/Install in Runtipi)

**Permission errors?**
- Run in Portainer console: `chmod -R 777 /srv/plugins`
- Restart the app

## Default Credentials

- **Username**: admin
- **Password**: admin (change immediately on first login)

## Notes

- The `lizmap-init` container mounts the plugins directory from your host
- Changes made in the container persist to the host volume
- You only need to install the plugin once - it will persist across restarts
