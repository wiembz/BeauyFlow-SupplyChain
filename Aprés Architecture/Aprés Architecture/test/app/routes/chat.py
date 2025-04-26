from flask import Blueprint, request, jsonify
from app.models.odoo_connector import models, uid, db, password

chat_routes = Blueprint('chat_routes', __name__)

@chat_routes.route('/api/messages/<int:user_id>', methods=['GET'])
def get_messages(user_id):
    # 🔥 Ici tu récupères les messages de Odoo pour cet user_id
    partner = models.execute_kw(
        db, uid, password,
        'res.users', 'read',
        [user_id],
        {'fields': ['partner_id']}
    )
    partner_id = partner[0]['partner_id'][0]

    messages = models.execute_kw(
        db, uid, password,
        'mail.message', 'search_read',
        [[['partner_ids', 'in', [partner_id]]]],
        {'fields': ['author_id', 'body', 'date']}
    )
    return jsonify(messages)
