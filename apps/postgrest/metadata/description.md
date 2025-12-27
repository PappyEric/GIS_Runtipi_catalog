# PostgREST: Instant APIs for your GIS Data

**PostgREST** is a standalone web server that turns your `gis-postgres` database directly into a RESTful API. 

## Why use this?
- **Zero Boilerplate**: No need to write manual backend code (Node.js/Python) just to serve data.
- **Auto-Generated**: It reads your database schema and automatically creates endpoints for tables, views, and stored procedures.
- **GeoJSON Support**: Since you have PostGIS extensions enabled, PostgREST serves your spatial data as standard GeoJSON, making it instantly consumable by Leaflet, OpenLayers, or MapLibre.

## Quick Start
Your API is running securely on port **3000**.
- **Endpoint**: `http://postgrest:3000`
- **Tables**: `http://postgrest:3000/mytable`
