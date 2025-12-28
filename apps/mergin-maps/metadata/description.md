# Mergin Maps CE: Field Data Collection

**Mergin Maps Community Edition** is the self-hosted server for the Mergin Maps ecosystem. It allows you to synchronize QGIS projects with mobile devices (iOS/Android) for offline field data collection.

## Why use this?
- **Offline Sync**: Collect GPS points, lines, and photos in the field without internet, then sync when back online.
- **QGIS Plugin**: Push/Pull changes directly from QGIS Desktop using the Mergin plugin.
- **Version Control**: Built-in diff viewer to see who changed what and when.

## Critical Configuration
- **DNS**: This app **requires** a valid public domain or accessible internal DNS to work with mobile apps.
- **Storage**: By default uses local Docker volumes. For production, configuring `MinIO` (S3) is highly recommended.
