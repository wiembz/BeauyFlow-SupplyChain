from flask import Blueprint, request, jsonify
from app.models.odoo_connector import models, uid, db, password

chat_routes = Blueprint('chat_routes', __name__)

@chat_routes.route('/api/chat/send', methods=['POST'])
def get_messages():
    data = request.get_json()
    auteur_id = data.get('auteur_id')
    destinataire_id = data.get('destinataire_id')
    message = data.get('message')

    # 🔍 Récupérer le partner_id du destinataire
    user = models.execute_kw(
        db, uid, password,
        'res.users', 'read',
        [destinataire_id],
        {'fields': ['partner_id']}
    )

    if not user or not user[0].get('partner_id'):
        return jsonify({'status': 'error', 'error': 'Partner ID not found'}), 400

    partner_id = user[0]['partner_id'][0]

    # ✅ Créer le message avec notification
    message_id = models.execute_kw(
        db, uid, password,
        'mail.message', 'create',
        [{
            'model': 'res.partner',
            'res_id': partner_id,
            'body': message,
            'message_type': 'notification',
            'subtype_id': 1,
            'author_id': auteur_id,
            'partner_ids': [(6, 0, [partner_id])]
        }]
    )

    return jsonify({'status': 'sent', 'message_id': message_id})
