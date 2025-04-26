from flask import Blueprint, jsonify
from app.models.odoo_connector import models, uid, db, password

users_routes = Blueprint('users_routes', __name__)

@users_routes.route('/api/users', methods=['GET'])
def get_users():
    users = models.execute_kw(
        db, uid, password,
        'res.users', 'search_read',
        [[]],
        {'fields': ['id', 'name'], 'limit': 100}
    )
    return jsonify(users)
