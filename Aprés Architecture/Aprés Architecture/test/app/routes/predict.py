from flask import Blueprint, request, jsonify
from app.services.model_service import predict_temperature_humidity

predict_bp = Blueprint('predict_bp', __name__)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    result = predict_temperature_humidity(data)
    return jsonify(result)
