# GraphHopper

GraphHopper provides routing APIs (directions, isochrones, matrix calculations) powered by OSM data. **It includes both a Web API and a Web Interface (GraphHopper Maps) that you can open in your browser.**

### ⚠️ Initial Setup Required
When you first install GraphHopper, it will crash or fail to load the webpage until you provide it with map data. 

To fix this:
1. Download an OpenStreetMap `.osm.pbf` file for your region (e.g., from [Geofabrik](https://download.geofabrik.de/)).
2. Place the `.osm.pbf` file in the GraphHopper data folder on your Runtipi server (usually `runtipi/app-data/graphhopper/data`).
3. You must also place a valid `config.yml` inside `runtipi/app-data/graphhopper/config`. You can find the default config file in the [GraphHopper repository](https://github.com/graphhopper/graphhopper/blob/master/config-example.yml).
4. Restart the GraphHopper app from your Runtipi dashboard.

It will take some time (depending on the size of the map data and your server's RAM) to build the routing graph. Once finished, the web interface will become accessible!