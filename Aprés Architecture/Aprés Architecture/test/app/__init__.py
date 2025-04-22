from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from app.routes.predict import predict_bp  
from app.routes.auth import auth_bp
from flask_jwt_extended import JWTManager
from flask_cors import CORS


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app, origins="http://localhost:4200")  # si ton frontend tourne sur 4200
  # Cela permet de gérer les requêtes CORS pour toutes les routes
    app.config.from_object('config.Config')
    jwt = JWTManager(app)
    db.init_app(app)

    
    app.register_blueprint(predict_bp)
    app.register_blueprint(auth_bp)
    return app



