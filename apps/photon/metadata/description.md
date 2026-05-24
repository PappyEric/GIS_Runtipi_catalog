# 🔍 Photon: Typo-Tolerant Geocoding Engine

**Photon** is an incredibly fast, multilingual, and typo-tolerant geocoding search engine built on top of **Elasticsearch** and **OpenStreetMap (OSM)** data. Created by Komoot, it is the modern standard for fast address searching, autocomplete, and reverse geocoding in open-source applications.

## 🚀 Key Features
- **Incredibly Fast Autocomplete**: Designed specifically for real-time search-as-you-type address boxes.
- **Typo-Tolerant Search**: Smart Elasticsearch-powered matching that handles user spelling mistakes easily.
- **Reverse Geocoding**: Convert coordinates (Latitude and Longitude) back into human-readable addresses instantly.
- **Multilingual Support**: Supports searching and returning address results in English, French, German, Italian, Spanish, and many more languages.

## 🏁 Initial Setup Required
Photon requires map search indexes to operate. The app starts with a blank volume and will not serve requests until data is loaded.

### Loading Data:
1. Download a pre-built Photon database dump from [Photon's official data page](https://photon.komoot.io/) or generate one from OSM PBFs.
2. Place the extracted index folder into the Photon data volume:
   `runtipi/app-data/photon/data/`
3. Restart the Photon application in your Runtipi dashboard.

## 💻 API Usage Examples
- **Forward Geocoding (Address Search)**:
  ```
  http://<your-ip>:2322/api?q=berlin
  ```
- **Reverse Geocoding (Find Address from Coordinates)**:
  ```
  http://<your-ip>:2322/reverse?lon=13.38886&lat=52.51704
  ```