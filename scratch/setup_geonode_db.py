import os
from pathlib import Path
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from dotenv import load_dotenv

# Load .env from repo root
env_path = Path(__file__).resolve().parent.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
    print("Loaded environment from .env")
else:
    print("WARNING: .env file not found. Relying on environment variables.")

# Connection params using defaults matching the .env
host = os.environ.get("DB_HOST", "localhost")
port = os.environ.get("DB_PORT", "5432")
user = os.environ.get("DB_USER", "postgres")
password = os.environ.get("DB_PASSWORD", "postgres")

def create_database_if_not_exists(db_name):
    print(f"Connecting to Postgres to manage database '{db_name}'...")
    # Connect to the default 'postgres' database to create new ones
    conn = psycopg2.connect(host=host, port=port, user=user, password=password, dbname="postgres")
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s", (db_name,))
    exists = cursor.fetchone()
    if not exists:
        print(f"Database '{db_name}' does not exist. Creating it...")
        cursor.execute(f"CREATE DATABASE {db_name}")
        print(f"Database '{db_name}' created.")
    else:
        print(f"Database '{db_name}' already exists.")

    cursor.close()
    conn.close()

    print(f"Adding postgis extension to '{db_name}'...")
    conn = psycopg2.connect(host=host, port=port, user=user, password=password, dbname=db_name)
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    cursor.execute("CREATE EXTENSION IF NOT EXISTS postgis;")
    print(f"PostGIS extension ensured on '{db_name}'.")
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_database_if_not_exists("geonode")
    create_database_if_not_exists("geonode_data")
    print("Setup complete.")
