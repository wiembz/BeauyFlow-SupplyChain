from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2

# Connexion à la base de données PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        dbname="Supply_Auth",
        user="postgres",
        password="azerty",
        host="localhost",
        port="5432"
    )
    return conn

def get_user_by_username(username):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, password, role FROM users WHERE username = %s", (username,))
    user = cur.fetchone()
    conn.close()
    return user

def add_decideur(username, password,email, role):
    conn = get_db_connection()
    cur = conn.cursor()
    hashed_password = generate_password_hash(password)
    cur.execute("INSERT INTO users (username, password,email, role) VALUES (%s, %s, %s, %s)", 
                (username, hashed_password, email, role))
    conn.commit()
    conn.close()
