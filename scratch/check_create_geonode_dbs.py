"""
Checks if geonode and geonode_data databases exist on the external PostGIS server,
creates them if missing, and enables the postgis and postgis_topology extensions.
"""
import os
from pathlib import Path
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Load .env from repo root
env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, val = line.partition("=")
            os.environ.setdefault(key.strip(), val.strip())

host     = os.environ["DB_HOST"]
port     = os.environ["DB_PORT"]
user     = os.environ["DB_USER"]
password = os.environ["DB_PASSWORD"]

def create_db_if_not_exists(db_name):
    # Connect to default postgres DB to check and create
    conn = psycopg2.connect(host=host, port=int(port), user=user, password=password, database="postgres")
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cur = conn.cursor()
    
    cur.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s", (db_name,))
    exists = cur.fetchone()
    
    if not exists:
        print(f"Database '{db_name}' does not exist. Creating...")
        cur.execute(f"CREATE DATABASE {db_name}")
        print(f"Database '{db_name}' created successfully.")
    else:
        print(f"Database '{db_name}' already exists.")
        
    cur.close()
    conn.close()

def enable_extensions(db_name):
    print(f"Connecting to '{db_name}' to enable extensions...")
    conn = psycopg2.connect(host=host, port=int(port), user=user, password=password, database=db_name)
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cur = conn.cursor()
    
    try:
        print(f"Enabling postgis extension in '{db_name}'...")
        cur.execute("CREATE EXTENSION IF NOT EXISTS postgis;")
        print("postgis enabled.")
    except Exception as e:
        print(f"Failed to enable postgis: {e}")
        
    try:
        print(f"Enabling postgis_topology extension in '{db_name}'...")
        cur.execute("CREATE EXTENSION IF NOT EXISTS postgis_topology;")
        print("postgis_topology enabled.")
    except Exception as e:
        print(f"Failed to enable postgis_topology: {e}")
        
    cur.close()
    conn.close()

if __name__ == "__main__":
    print(f"Connecting to PostGIS server at {host}:{port}...")
    for db in ["geonode", "geonode_data"]:
        create_db_if_not_exists(db)
        enable_extensions(db)
    print("All databases checked and prepared.")
