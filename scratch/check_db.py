import psycopg2
conn = psycopg2.connect(host='66.228.34.44', port=5432, user='postgres', password='REDACTED', database='mergin_maps')
cur = conn.cursor()
cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name")
tables = [t[0] for t in cur.fetchall()]
print('Tables:', tables)

cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='project' ORDER BY ordinal_position")
print('Project columns:', cur.fetchall())

# Check workspace table
if 'workspace' in tables:
    cur.execute("SELECT * FROM workspace LIMIT 5")
    print('Workspaces:', cur.fetchall())
else:
    print('WARNING: no workspace table found!')

# Check alembic version
cur.execute("SELECT * FROM alembic_version")
print('Alembic versions:', cur.fetchall())

conn.close()
