# GeoServer: The Industry Standard

**GeoServer** is a java-based server that allows you to view and edit geospatial data. It implements OGC (Open Geospatial Consortium) standards like WMS, WFS, and WCS.

## Why use this?
- **Standard Protocol**: If you need to serve data to QGIS Desktop, ArcGIS, or government portals, they likely expect WFS/WMS services. GeoServer is the default choice for this.
- **Advanced Styling**: Use SLD (Styled Layer Descriptor) or CSS to create complex, scale-dependent map styles.
- **Vector Tiles**: Serves high-performance Vector Tiles for modern web maps.

## Integration
This is a standalone instance. It is separate from the bundled GeoNode-GeoServer. Use this if you want a pure, unopinionated OGC server connected to `gis-postgres`.
