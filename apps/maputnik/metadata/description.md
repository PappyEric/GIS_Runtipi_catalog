# 🎨 Maputnik: Visual Vector Tile Style Editor

**Maputnik** is the leading free and open-source visual editor for the **Mapbox Style Specification**. It allows you to design and style vector maps visually, giving you absolute creative control over how your geographic layers appear in MapLibre GL JS, Mapbox GL JS, and QGIS.

## 🚀 Key Features
- **Visual Editing**: Create, inspect, and modify style rules for layers, fonts, colors, and line widths without writing JSON by hand.
- **Real-Time Preview**: Instantly preview styling changes as you tweak layer colors, zoom levels, and filters.
- **Mapbox Style Compliant**: Fully compatible with standard Mapbox Style JSON specifications.
- **Local Tiles Integration**: Connects directly to local vector tile servers like **Martin** in our catalog to style your database layers.

## 🏁 Quick Start
1. **Open Maputnik**: Access Maputnik at `http://<your-ip>:8889` in your web browser.
2. **Connect to Martin (Vector Tiles)**:
   - In Maputnik, click on **Sources** at the top.
   - Add a new vector source pointing to your Martin tile server:
     ```
     http://<your-ip>:3003/index.json
     ```
3. **Style Layers**: Add background layers, road networks, building outlines, and custom points, styling each according to zoom level.
4. **Export Styles**: Once satisfied, export the style JSON to load directly into your web map application!