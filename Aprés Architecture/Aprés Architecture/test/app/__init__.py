from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from app.routes.predict import predict_bp  # Import absolu
    app.register_blueprint(predict_bp)

    return app