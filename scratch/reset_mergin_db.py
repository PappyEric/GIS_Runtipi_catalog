"""
Resets (drops + recreates) the mergin_maps database.
Credentials are loaded from .env in the repo root - never hardcoded here.
"""
import os
from pathlib import Path
import psycopg2

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
database = os.environ["DB_DATABASE"]

conn = psycopg2.connect(host=host, port=int(port), user=user, password=password, database="postgres")
conn.autocommit = True
cur = conn.cursor()

cur.execute(f"""
    SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity
    WHERE datname = '{database}' AND pid <> pg_backend_pid()
""")
terminated = cur.fetchall()
print(f"Terminated {len(terminated)} connections")

cur.execute(f"DROP DATABASE IF EXISTS {database}")
print(f"Dropped database {database}")

cur.execute(f"CREATE DATABASE {database}")
print(f"Created fresh database {database}")

conn.close()
print("Done.")
