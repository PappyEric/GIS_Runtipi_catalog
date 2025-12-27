# Mergin Maps CE

Mergin Maps Server allows you to sync QGIS projects for field data collection.


## Important Note
This is the **Community Edition**. It requires significant configuration (DNS, MinIO/S3, etc) to work fully. This app is provided as a starting point.

**Storage**: By default, this app uses a local Docker volume (`data`) for storage. For production use with large files (photos), you should configure an external MinIO/S3 bucket in the app settings or env vars.
