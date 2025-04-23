import os

class Config:
    SECRET_KEY = os.urandom(24)  # Clé secrète pour les sessions
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:0000@localhost/Supply_Auth'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'super-secret-key'  # tu peux en générer une plus complexe
