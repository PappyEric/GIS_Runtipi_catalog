# Lizmap Web Client: Publish QGIS Projects

**Lizmap Web Client** allows you to publish QGIS projects directly to the web without rewriting your map logic. It reads the QGIS project file (`.qgs`/`.qgz`) and replicates the symbology, attribute tables, and print layouts exactly as they appear in QGIS Desktop.

## Why use this?
- **WYSIWYG Publishing**: Create your map in QGIS Desktop, save it, and it's online. No JavaScript coding required.
- **Editing Capabilities**: Enabling "WFS-T" in QGIS allows users to edit geometries and attributes directly in the web browser.
- **Print Layouts**: Uses QGIS Layouts to generate high-quality PDF maps for users.

## Quick Start
1.  Use the `QGIS Web Desktop` app to create a project.
2.  Save the `.qgs` file into the `lizmap` storage folder.
3.  Open the Lizmap admin panel (default: `admin`/`admin`) to enable the project.
