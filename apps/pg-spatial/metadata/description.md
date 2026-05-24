# 🐘 Crunchy Spatial Servers: Instant PostGIS APIs

**Crunchy Spatial** bundles two lightweight, high-performance Go-based spatial servers from CrunchyData: **pg_tileserv** and **pg_featureserv**. Together, they expose your **PostGIS** database tables directly to the web as standard geospatial formats, removing the need for heavy application servers.

## 🚀 The Bundle

### 1. `pg_tileserv` (Vector Tile Server)
Serves dynamic Mapbox Vector Tiles (MVT) directly from Postgres tables, views, or custom database functions.
- **Performance**: Super fast, native C/Go database query translation.
- **Dynamic Functions**: Query databases with parameters to render dynamic geometric calculations on-the-fly.

### 2. `pg_featureserv` (OGC API Features Server)
Exposes PostGIS tables as a modern, RESTful **OGC API Features** (formerly WFS3) web service.
- **Output**: Returns standard GeoJSON or HTML representation of database features.
- **Advanced Querying**: Supports server-side spatial filtering, sorting, limits, and properties selection natively via URL arguments.

## 🏁 Quick Start
1. **Database URL**: During installation, configure the `DATABASE_URL` parameter to point to your PostGIS database:
   - Default: `postgresql://postgres:postgisadmin@gis-postgres:5433/gis`
2. **Accessing the Interfaces**:
   - `pg_tileserv`: Access at `http://<your-ip>:9000` to preview vector tile layers on an interactive map.
   - `pg_featureserv`: Access at `http://<your-ip>:9000/features` (or subpaths) to read and query GeoJSON endpoints.
3. **Adding Map Layers**: Use the endpoints directly inside MapLibre, Leaflet, OpenLayers, or QGIS.