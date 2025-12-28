# GIS PostGIS Engine: The Core of Your Stack

**GIS PostGIS Engine** is the central database service for your entire geospatial catalog. It combines the power of **PostgreSQL 16** with the industry-standard **PostGIS 3.4** extension and **pgvector** for AI workloads.

## Why use this?
- **Centralized Data**: Acts as the "Single Source of Truth". All other apps (GeoServer, Lizmap, N8N, etc.) connect here to read/write data.
- **Advanced Spatial Queries**: Perform complex geometric operations (intersections, buffers, routing) directly in SQL.
- **AI Ready**: Includes `pgvector` to store vector embeddings for semantic search and RAG (Retrieval-Augmented Generation) applications.

## Quick Start
- **Internal Hostname**: `gis-postgres` (use this when connecting other Runtipi apps).
- **Port**: `5432`
- **Recommended**: Install this app **first** before deploying any dependent services.
