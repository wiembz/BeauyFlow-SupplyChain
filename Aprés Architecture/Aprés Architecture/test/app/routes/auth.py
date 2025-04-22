from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.models import get_user_by_username, add_decideur

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Champs requis manquants'}), 400

    user = get_user_by_username(username)

    if user and check_password_hash(user[1], password):
        access_token = create_access_token(identity={'id': user[0], 'role': user[2]})
        return jsonify({
            'message': 'Connexion réussie',
            'access_token': access_token
        }), 200

    return jsonify({'error': 'Identifiants invalides'}), 401

@auth_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user = get_jwt_identity()
    return jsonify({
        'message': f"Bienvenue {current_user['role']}",
        'user_id': current_user['id'],
        'role': current_user['role']
    }), 200

@auth_bp.route('/add_decideur', methods=['POST'])
@jwt_required()
def add_decideur_route():
    current_user = get_jwt_identity()

    if current_user['role'] != 'superviseur':
        return jsonify({'error': 'Accès refusé'}), 403

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    role = data.get('role')

    if not username or not password or not email or not role:
        return jsonify({'error': 'Champs requis manquants'}), 400

    add_decideur(username, password, email, role)
    return jsonify({'message': 'Décideur ajouté avec succès'}), 201
