# app/routes/addOdooMsg.py

from flask import Blueprint, request, jsonify
from app.models.odoo_connector import models, uid, db, password

add_msg_routes = Blueprint('add_msg_routes', __name__)

@add_msg_routes.route('/api/messages/<int:projet_id>', methods=['POST'])
def ajouter_message(projet_id):
    data = request.get_json()
    contenu = data.get('message')

    models.execute_kw(
        db, uid, password,
        'mail.message', 'create',
        [{
            'model': 'project.project',
            'res_id': projet_id,
            'body': contenu,
            'message_type': 'comment',
            'subtype_id': 1
        }]
    )
    return jsonify({'status': 'ok'})
