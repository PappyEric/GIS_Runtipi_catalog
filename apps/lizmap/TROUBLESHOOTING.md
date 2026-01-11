# Lizmap Plugin Installation - DEFINITIVE FIX

## Problem

QGIS Server shows `"Loaded 0 plugin(s) successfully"` even though plugin files exist.

## Root Cause

The plugin directory structure doesn't match what QGIS Server expects for Python server plugins.

## Solution

Run this **COMPLETE FIX** script in Portainer Console (`lizmap-init` container):

```sh
#!/bin/sh
echo "=== Lizmap Server Plugin - Complete Fix ==="
echo ""

# Navigate to plugins directory
cd /srv/plugins || exit 1

# Clean everything
echo "1. Cleaning old installations..."
rm -rf lizmap_server qgis-lizmap-server-plugin-master *.zip

# Download plugin
echo "2. Downloading plugin..."
wget -q https://github.com/3liz/qgis-lizmap-server-plugin/archive/refs/heads/master.zip -O plugin.zip

if [ ! -f plugin.zip ]; then
    echo "ERROR: Download failed!"
    exit 1
fi

# Extract
echo "3. Extracting..."
unzip -q -o plugin.zip

# Rename to exact name QGIS expects
echo "4. Setting up directory structure..."
mv qgis-lizmap-server-plugin-master lizmap_server

# Verify critical files exist
echo ""
echo "5. Verifying installation..."

if [ ! -f lizmap_server/__init__.py ]; then
    echo "ERROR: __init__.py not found!"
    ls -la lizmap_server/ | head -20
    exit 1
fi

if [ ! -f lizmap_server/metadata.txt ]; then
    echo "ERROR: metadata.txt not found!"
    exit 1
fi

# Set permissions (QGIS Server runs as user 1000:1000 per QGSRV_USER)
echo "6. Setting permissions..."
chown -R 1000:1000 lizmap_server
chmod -R 755 lizmap_server

# Make Python files executable
find lizmap_server -name "*.py" -exec chmod 644 {} \;

# Cleanup
rm -f plugin.zip

echo ""
echo "=== Installation Complete ==="
echo ""
echo "Plugin structure:"
ls -la /srv/plugins/
echo ""
echo "Plugin contents (first 15 files):"
ls -la /srv/plugins/lizmap_server/ | head -15
echo ""
echo "Python files found:"
find /srv/plugins/lizmap_server -name "*.py" -type f | head -10
echo ""
echo "Metadata check:"
head -5 /srv/plugins/lizmap_server/metadata.txt
echo ""
echo "=== NEXT STEP: Restart Lizmap app in Runtipi ==="
```

## After Running the Script

1. **Restart the Lizmap app** in Runtipi (Stop → Start or Uninstall → Install)

2. **Check QGIS Server logs** in Portainer for the `qgis-server` container:
   - Look for: `"Initializing plugins from /srv/plugins"`
   - Should see: `"Loaded 1 plugin(s) successfully"` (not 0!)
   - Should see: `"Loading Python plugin lizmap_server"`

3. **Verify in Lizmap**:
   - Go to Admin → QGIS Server Information
   - All checks should be green
   - No more 404 errors in logs

## If Still Not Working

Run these diagnostic commands in the `qgis-server` container console:

```sh
# Check if QGIS Server can see the plugins directory
ls -la /srv/plugins/

# Check environment variable
echo $QGSRV_SERVER_PLUGINPATH

# Try to import the plugin manually (as Python)
python3 -c "import sys; sys.path.append('/srv/plugins'); import lizmap_server; print('SUCCESS')"
```

## Alternative: Check Plugin Compatibility

If the plugin still won't load, verify the QGIS version compatibility:

```sh
# In qgis-server container
qgis --version

# Check plugin metadata for compatible versions
grep -i "qgisMinimumVersion\|qgisMaximumVersion" /srv/plugins/lizmap_server/metadata.txt
```

The plugin should be compatible with QGIS 3.34 (your version).
