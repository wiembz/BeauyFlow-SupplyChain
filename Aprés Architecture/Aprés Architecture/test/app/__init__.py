from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

# Import de tes Blueprints
from app.routes.predict import predict_bp
from app.routes.auth import auth_bp
from app.routes.getOdooMsg import odoo_routes
from app.routes.addOdooMsg import add_msg_routes
from app.routes.chat import chat_routes as chat_odoo_routes
from app.routes.task import task_routes

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app, origins="http://localhost:4200")  # Frontend Angular en 4200
    app.config.from_object('config.Config')
    
    jwt = JWTManager(app)
    db.init_app(app)

    # ✨ Enregistrer tous les Blueprints
    app.register_blueprint(predict_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(odoo_routes)
    app.register_blueprint(add_msg_routes)
    app.register_blueprint(chat_odoo_routes)
    app.register_blueprint(task_routes)  # <= AJOUTÉ

    return app
