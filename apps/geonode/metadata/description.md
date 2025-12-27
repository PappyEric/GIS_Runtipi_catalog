# GeoNode

GeoNode is a web-based application and platform for developing geospatial information systems (GIS) and for deploying spatial data infrastructures (SDI).

## Configuration
This app bundles its own **internal GeoServer** optimized for GeoNode.
It connects to your main `gis-postgres` for storage.

**Important**:
1.  **Site Host**: You MUST set this to the IP or Domain you use to access Runtipi (e.g. `192.168.1.50` or `my.domain.com`). If incorrect, static files and logins may fail.
2.  **Database**: Ensure the `tipi` user has permission to create `geonode` and `geonode_data` databases, or create them manually in `gis-postgres`.
