# Modern GIS Runtipi Catalog

A curated collection of production-ready Geospatial, AI, and Data tools for [Runtipi](https://runtipi.io/). 

This catalog allows you to deploy a complete **Modern GIS Stack** (PostGIS, GeoServer, QGIS, Mergin Maps, etc.) on your self-hosted server in minutes.

## 🌟 Included Applications

### 🛠 Core Infrastructure
- **GIS PostGIS Engine**: The heart of the stack. PostgreSQL 16 + PostGIS 3.4 + pgvector.
- **MinIO**: High-performance S3-compatible object storage for massive geospatial datasets.

### 🗺️ Map Serving & Management
- **GeoNode**: The ultimate open-source Geospatial CMS and SDI platform.
- **GeoServer**: The industry standard OGC server for WFS/WMS/WCS.
- **Martin Tile Server**: Blazing fast Vector Tiles directly from PostGIS.
- **Lizmap Web Client**: Publish QGIS projects as feature-rich web maps.
- **Mergin Maps CE**: Self-hosted server for the Mergin Maps mobile field collection app.

### 💻 Desktop & Analysis
- **QGIS Web Desktop**: Full QGIS LTR running in your browser via KasmVNC.
- **Geospatial Lab**: JupyterLab configured with Python, GeoPandas, and DuckDB.
- **Potree Viewer**: WebGL-based viewer for massive point cloud rendered datasets.

### 🤖 AI & Automation
- **Geospatial AI Suite**: Private AI stack with AnythingLLM and Ollama (Llama 3, etc.).
- **n8n Automation**: Workflow automation node-based tool.
- **Vector Admin**: GUI for managing pgvector embeddings.

### 📊 Data & APIs
- **PostgREST**: Instantly turn your database schema into a RESTful API.
- **Metabase**: Beautiful Business Intelligence dashboards and charts.
- **CloudBeaver**: Collaborative cloud database client.
- **pgAdmin 4**: The most popular management tool for PostgreSQL.

## 🚀 Installation

1.  Open your **Runtipi Dashboard**.
2.  Go to **Settings** -> **App Store**.
3.  Add Custom Catalog: `https://github.com/PappyEric/GIS_Runtipi_catalog` (or your specific URL).
4.  Go to the **App Store** tab.
5.  **Install `GIS PostGIS Engine` FIRST.**
    *   Set your credentials securely.
6.  Install other apps.
    *   **Crucial**: When asked for `Postgres Host`, `User`, or `Password`, use the credentials you set in Step 5.
    *   The internal hostname is `gis-postgres`.

## 🏗 Architecture

This catalog follows a "Split-Stack" philosophy (Service Oriented Architecture):

-   **Single Source of Truth**: All apps connect to the central `gis-postgres` database. We avoid bundling separate DBs inside each container.
-   **Storage**: Heavy files (rasters, point clouds) should go to `minio` (S3).
-   **Integration**: Apps like `n8n` or `postgrest` can act as glue between your map data and external services.

## 🤝 Contributing

Pull requests are welcome! If you have a favorite open-source GIS tool you'd like to see, please submit an issue or PR.
