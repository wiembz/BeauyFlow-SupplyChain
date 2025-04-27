from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

from app.routes.predict import predict_bp
from app.routes.auth import auth_bp
from app.routes.getOdooMsg import odoo_routes
from app.routes.addOdooMsg import add_msg_routes
from app.routes.chat import chat_routes as chat_odoo_routes
from app.routes.task import task_routes
from app.routes.users import users_routes
from app.routes.calendar import calendar_api

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    CORS(app, origins="http://localhost:4200")  # Seulement ton frontend Angular

    jwt = JWTManager(app)
    db.init_app(app)

    # Enregistrer tous les blueprints
    app.register_blueprint(predict_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(odoo_routes)
    app.register_blueprint(add_msg_routes)
    app.register_blueprint(chat_odoo_routes)
    app.register_blueprint(task_routes)
    app.register_blueprint(users_routes)
    app.register_blueprint(calendar_api)

    return app
