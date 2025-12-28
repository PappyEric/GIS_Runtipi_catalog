# Geospatial Lab: Python Data Science

**Geospatial Lab** is a pre-configured **JupyterLab** environment tailored for geospatial data science. It comes loaded with the full Python GIS stack.

## Why use this?
- **Batteries Included**: No need to `pip install` GDAL, GeoPandas, Rasterio, or DuckDB. They are all pre-installed.
- **Heavy Lifting**: Run long-running analysis scripts (e.g. converting 100GB of GeoTIFFs) on your server instead of your laptop.
- **Notebooks**: Share your analysis as interactive notebooks with colleagues.

## Quick Start
- **Access**: Port **8888**.
- **Token**: Check the container logs `docker logs geospatial-lab` on first run to get the access token, or set a password in the UI.
