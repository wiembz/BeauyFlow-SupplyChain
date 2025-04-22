from app import db

class User(db.Model):
    __tablename__ = 'users'  # Correspond au nom réel dans ta base PostgreSQL
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    role = db.Column(db.String(20), nullable=False)  # "superviseur" ou "decideur"
