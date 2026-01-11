# Lizmap QGIS Server Plugin - Troubleshooting Guide

## Current Status

Based on your screenshots:
- ✅ Plugin files are installed (version 2.13.0 detected)
- ✅ QGIS Server is running
- ❌ Plugin is not being loaded by QGIS Server (404 errors on `/lizmap/server.json`)

## Fix: Verify Plugin Structure

The plugin needs to be in the correct directory structure. Run this in **Portainer Console** on the `lizmap-init` container:

```sh
# Check current structure
ls -la /srv/plugins/
ls -la /srv/plugins/lizmap_server/

# Verify metadata.txt exists
cat /srv/plugins/lizmap_server/metadata.txt

# Check for __init__.py (required for Python plugins)
ls -la /srv/plugins/lizmap_server/__init__.py
```

## Solution 1: Fix Plugin Structure (Most Likely Issue)

QGIS Server might not be finding the plugin because of the directory structure. Try this:

```sh
cd /srv/plugins
# Remove old installation
rm -rf lizmap_server

# Reinstall with correct structure
wget https://github.com/3liz/qgis-lizmap-server-plugin/archive/refs/heads/master.zip -O lizmap.zip
unzip -o lizmap.zip

# The plugin should be in a directory named exactly "lizmap_server"
# Check what was extracted
ls -la

# If it extracted as "qgis-lizmap-server-plugin-master", rename it
mv qgis-lizmap-server-plugin-master lizmap_server

# Ensure the main plugin files are directly in lizmap_server/
ls -la lizmap_server/

# Set permissions
chmod -R 777 lizmap_server

# Clean up
rm lizmap.zip
```

## Solution 2: Check Plugin Path Variable

The environment variable might be pointing to the wrong location. In Portainer, check the `qgis-server` container environment:

Expected: `QGSRV_SERVER_PLUGINPATH=/srv/plugins`

## Solution 3: Restart QGIS Server

After fixing the structure, restart the entire Lizmap app in Runtipi to reload the plugin.

## Verification Commands

Run these in the `lizmap-init` container console to verify:

```sh
# 1. Check if metadata.txt exists and is readable
cat /srv/plugins/lizmap_server/metadata.txt | head -20

# 2. Check if __init__.py exists (required for Python plugins)
test -f /srv/plugins/lizmap_server/__init__.py && echo "✓ __init__.py found" || echo "✗ __init__.py missing"

# 3. Check if serverinfo.py exists (main plugin file)
test -f /srv/plugins/lizmap_server/serverinfo.py && echo "✓ serverinfo.py found" || echo "✗ serverinfo.py missing"

# 4. List all Python files
find /srv/plugins/lizmap_server/ -name "*.py" | head -10

# 5. Check permissions
ls -la /srv/plugins/lizmap_server/ | head -10
```

## Expected Output

After correct installation, you should see:
```
/srv/plugins/
└── lizmap_server/
    ├── __init__.py
    ├── metadata.txt
    ├── serverinfo.py
    └── [other plugin files]
```

## Alternative: Check QGIS Server Logs

In Portainer, check the logs of the `qgis-server` container for plugin loading messages:

Look for lines like:
- `"Initializing plugins from /srv/plugins"`
- `"Loaded X plugin(s) successfully"`

If it still shows `"Loaded 0 plugin(s)"`, the plugin structure is incorrect.

## Quick Fix Script

Copy and paste this entire block into Portainer console:

```sh
#!/bin/sh
echo "=== Lizmap Plugin Installation Fix ==="
cd /srv/plugins
rm -rf lizmap_server qgis-lizmap-server-plugin-master lizmap.zip
wget -q https://github.com/3liz/qgis-lizmap-server-plugin/archive/refs/heads/master.zip -O lizmap.zip
unzip -q -o lizmap.zip
mv qgis-lizmap-server-plugin-master lizmap_server
chmod -R 777 lizmap_server
rm lizmap.zip

echo ""
echo "=== Verification ==="
echo "Plugin directory:"
ls -la /srv/plugins/

echo ""
echo "Plugin files:"
ls -la /srv/plugins/lizmap_server/ | head -15

echo ""
echo "Checking required files:"
test -f /srv/plugins/lizmap_server/__init__.py && echo "✓ __init__.py found" || echo "✗ __init__.py MISSING"
test -f /srv/plugins/lizmap_server/metadata.txt && echo "✓ metadata.txt found" || echo "✗ metadata.txt MISSING"
test -f /srv/plugins/lizmap_server/serverinfo.py && echo "✓ serverinfo.py found" || echo "✗ serverinfo.py MISSING"

echo ""
echo "=== Installation complete! ==="
echo "Now restart the Lizmap app in Runtipi"
```

After running this, **restart the Lizmap app** and check the Server Information page again.
