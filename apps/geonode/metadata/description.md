# GeoNode: Spatial Data Infrastructure

**GeoNode** is a complete geospatial Content Management System (CMS). It bundles map management, user permissions, and metadata editing into one collaborative platform.

## Why use this?
- **Collaboration**: Allow users to upload, edit, and comment on datasets.
- **Metadata**: Strict ISO-compliant metadata editing and searching (CSW).
- **Security**: Granular permission control—decide exactly who can see or edit which map layer.
- **Visualization**: Built-in map viewer to compose layers without writing code.

## Configuration
This app is a complex stack including Django, Celery, and its own optimized GeoServer. 
**Crucial**: Ensure you set the `Site Host/Domain` to your actual IP/Domain, or static assets (CSS/JS) will fail to load.
