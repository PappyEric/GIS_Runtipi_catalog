import psycopg2

conn = psycopg2.connect(
    host='66.228.34.44',
    port=5432,
    user='postgres',
    password='1W34s3l_615#37',
    database='mergin_maps'
)
cur = conn.cursor()

cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name")
tables = [t[0] for t in cur.fetchall()]
print('All Tables in DB:', tables)

cur.execute("SELECT * FROM alembic_version")
print('Current alembic_version rows:', cur.fetchall())

# Check project table columns
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='project' ORDER BY ordinal_position")
print('Project table columns:')
for col in cur.fetchall():
    print(f"  - {col[0]} ({col[1]})")

conn.close()
