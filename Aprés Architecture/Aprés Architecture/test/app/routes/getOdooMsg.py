from flask import Blueprint, jsonify
from app.models.odoo_connector import models, uid, db, password

odoo_routes = Blueprint('odoo_routes', __name__)

@odoo_routes.route('/api/messages/<int:user_id>', methods=['GET'])
def get_messages(user_id):
    user = models.execute_kw(
        db, uid, password,
        'res.users', 'read',
        [user_id],
        {'fields': ['partner_id']}
    )

    if not user or not user[0].get('partner_id'):
        return jsonify([])

    partner_id = user[0]['partner_id'][0]

    messages = models.execute_kw(
        db, uid, password,
        'mail.message', 'search_read',
        [[['partner_ids', 'in', [partner_id]]]],
        {'fields': ['author_id', 'body', 'date']}
    )
    return jsonify(messages)
