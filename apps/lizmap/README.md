# Lizmap QGIS Server Plugin Installation

The Lizmap server plugin must be manually installed for full functionality.

## Quick Installation

Run these commands on your Runtipi server:

```bash
# Navigate to your Runtipi app data directory
cd /path/to/runtipi/app-data/lizmap/plugins

# Download and extract the Lizmap server plugin
wget https://github.com/3liz/qgis-lizmap-server-plugin/archive/refs/heads/master.zip
unzip master.zip
mv qgis-lizmap-server-plugin-master lizmap_server

# Set permissions
chmod -R 755 lizmap_server

# Clean up
rm master.zip
```

## Verification

1. Restart the Lizmap app in Runtipi
2. Log into Lizmap Web Client (default: admin/admin)
3. Go to **Admin** → **QGIS Server Information**
4. Verify that "Lizmap server plugin" shows a green checkmark

## Troubleshooting

If the plugin is not detected:
- Ensure the plugin directory structure is: `plugins/lizmap_server/metadata.txt`
- Check permissions: `ls -la plugins/`
- Restart the app completely (Uninstall/Install)

## Default Credentials

- **Username**: admin
- **Password**: admin (change on first login)
