from flask import Blueprint, jsonify
from app.models.odoo_connector import models, uid, db, password

odoo_routes = Blueprint('odoo_routes', __name__)

@odoo_routes.route('/api/messages/<int:projet_id>', methods=['GET'])
def get_messages_projet(projet_id):
    messages = models.execute_kw(
        db, uid, password,
        'mail.message', 'search_read',
        [[['model', '=', 'project.project'], ['res_id', '=', projet_id]]],
        {'fields': ['body', 'author_id', 'date']}
    )
    return jsonify(messages)
