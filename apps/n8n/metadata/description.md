# n8n: Workflow Automation

**n8n** is an extendable workflow automation tool. With a fair-code distribution model, n8n will always have visible source code, be available to self-host, and allow you to add your own custom functions, logic, and apps.

## Why use this?
- **GIS ETL**: Create pipelines to move data from API -> PostGIS -> GeoServer.
- **Event Triggers**: Listen to webhooks (e.g. from Mergin Maps) and trigger actions (e.g. send an email, run a spatial query).
- **No-Code**: Build complex logic visually with nodes.

## Integration
- **Database**: This instance is configured to store its own workflow state in `gis-postgres`. 
- **Nodes**: Includes the Postgres node to interact with your data.
