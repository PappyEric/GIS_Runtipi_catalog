# 🛰️ TiTiler: Dynamic Raster Tile Server

**TiTiler** is a modern, extremely fast dynamic tile server built on top of **FastAPI**, **Rasterio**, and **GDAL**. It allows you to dynamically generate map tiles from Cloud Optimized GeoTIFFs (COGs) and SpatioTemporal Asset Catalogs (STAC) on the fly, eliminating the need to pre-render tile caches.

## 🚀 Key Features
- **On-the-Fly Tile Generation**: Render tiles directly from local or remote S3-compatible cloud storage (like our **MinIO** app).
- **COG & STAC Support**: Designed specifically to support Cloud Optimized GeoTIFFs and SpatioTemporal Asset Catalogs.
- **Multiple Output Formats**: Supports Mapbox Vector Tiles (MVT), PNG, JPEG, WEBP, and GeoTIFF export.
- **Dynamic Resampling & Colormaps**: Apply color tables, bands math, and custom resampling algorithms dynamically via query parameters.
- **Interactive Documentation**: Comes with built-in FastAPI OpenAPI documentation.

## 🏁 Quick Start
1. **Interactive UI / API Docs**: Once installed, open `http://<your-ip>:8000/docs` to view the interactive Swagger API documentation.
2. **Dynamic Rendering Example**:
   To render a COG tile layer on your map:
   ```
   http://localhost:8000/cog/tiles/{z}/{x}/{y}?url=https://your-domain.com/my-cog.tif
   ```
3. **Integration**: Connects beautifully with **MinIO** for cloud-hosted GeoTIFF storage. Ensure your MinIO buckets are public or provide authorization headers to TiTiler.