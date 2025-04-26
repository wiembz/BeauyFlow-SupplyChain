from flask import Blueprint, jsonify
import xmlrpc.client

odoo_routes = Blueprint('odoo_routes', __name__)

@odoo_routes.route('/api/messages/<int:user_id>', methods=['GET'])
def get_messages(user_id):
    url = "http://localhost:8069"
    db = "Beauty-Flow"
    username = "nouha.chine@esprit.tn"
    password = "211JFT6526IYED+"

    common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
    uid = common.authenticate(db, username, password, {})
    models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

    user = models.execute_kw(
        db, uid, password,
        'res.users', 'read',
        [user_id],
        {'fields': ['partner_id']}
    )

    if not user or not user[0].get('partner_id'):
        return jsonify([])

    partner_id = int(user[0]['partner_id'][0])

    messages = models.execute_kw(
        db, uid, password,
        'mail.message', 'search_read',
        [[['partner_ids', 'in', [partner_id]]]],
        {'fields': ['author_id', 'body', 'date']}
    )

    return jsonify(messages)
