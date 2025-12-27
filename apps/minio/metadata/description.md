# MinIO: Private Cloud Storage

**MinIO** is a high-performance, S3-compatible object storage server. It provides the same API as Amazon S3 but runs locally on your Runtipi.

## Why use this?
- **Massive Data**: Store terabytes of raster imagery (GeoTIFFs), point clouds (LAS/LAZ), and drone footage without clogging your main database.
- **Cloud Native**: Applications like Mergin Maps, GeoNode, and modern GIS tools expect S3 storage for scalability.
- **Universal Access**: Use standard tools like `rclone`, `boto3`, or `Cyberduck` to manage your files.

## Access
- **Console**: Log in to the web console on port **9001** (default user/pass set during install).
- **API Endpoint**: Internal apps connect via `http://minio:9000`.
