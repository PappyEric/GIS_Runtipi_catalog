import psycopg2

conn = psycopg2.connect(host='66.228.34.44', port=5432, user='postgres', password='REDACTED', database='postgres')
conn.autocommit = True
cur = conn.cursor()

# Terminate all existing connections to mergin_maps
cur.execute("""
    SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity
    WHERE datname = 'mergin_maps' AND pid <> pg_backend_pid()
""")
terminated = cur.fetchall()
print(f"Terminated {len(terminated)} connections")

cur.execute("DROP DATABASE IF EXISTS mergin_maps")
print("Dropped database mergin_maps")

cur.execute("CREATE DATABASE mergin_maps")
print("Created fresh database mergin_maps")

conn.close()
print("Done.")
