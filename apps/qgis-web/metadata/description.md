# QGIS Web Desktop: GIS in your Browser

**QGIS Web Desktop** runs a full instance of QGIS LTR (Long Term Release) inside a Docker container and streams the UI to your browser via KasmVNC.

## Why use this?
- **Remote Work**: access your powerful GIS setup from a Chromebook, iPad, or any computer with a browser.
- **Centralized Projects**: Keep your project files on the server (via `minio` or shared volumes) instead of syncing files between computers.
- **Processing Power**: Run heavy geoprocessing tasks on your Runtipi server hardware instead of your laptop battery.

## Quick Start
- **Access**: Uses **KasmVNC** for a smooth, high-fidelity experience.
- **Login**: `kasm_user` / `password` (or whatever you configured).
- **GPU**: Supports hardware acceleration if your server allows it.
