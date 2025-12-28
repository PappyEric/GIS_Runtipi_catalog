# Martin Tile Server: Blazing Fast Vector Tiles

**Martin** is a high-performance, on-the-fly Vector Tile server written in Rust. It connects directly to PostGIS and serves tables as Mapbox Vector Tiles (MVT).

## Why use this?
- **Performance**: Capable of serving massive datasets (millions of points) via vector tiles, which are much lighter than image tiles.
- **Dynamic**: No need to "seed" a cache. Changes to the database are reflected instantly on the map.
- **Function Support**: Can serve the results of complex PostGIS functions (e.g. `get_fire_risk_zones(date)`) as a tile layer.

## Quick Start
- **Auto-Discovery**: Martin automatically finds tables with geometry/geography columns in `gis-postgres`.
- **Endpoint**: `http://martin:3000`
- **Catalog**: Check `http://martin:3000/catalog` to see available layers.
