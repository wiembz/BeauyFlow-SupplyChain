from flask import Blueprint, request, jsonify
from app.models.odoo_connector import models, uid, db, password

chat_routes = Blueprint('chat_routes', __name__)

@chat_routes.route('/api/chat/send', methods=['POST'])
def envoyer_message():
    data = request.get_json()
    auteur_id = data['auteur_id']
    destinataire_id = data['destinataire_id']
    message = data['message']

    # 🔁 Obtenir les partner_id de l’auteur et du destinataire
    auteur_user = models.execute_kw(db, uid, password, 'res.users', 'read', [auteur_id], {'fields': ['partner_id']})
    dest_user = models.execute_kw(db, uid, password, 'res.users', 'read', [destinataire_id], {'fields': ['partner_id']})
    partner_a = auteur_user[0]['partner_id'][0]
    partner_b = dest_user[0]['partner_id'][0]

    # 🔍 Chercher s’il existe déjà un canal entre les deux
    channels = models.execute_kw(
        db, uid, password,
        'mail.channel', 'search_read',
        [[
            ('channel_partner_ids', 'in', [partner_a, partner_b]),
            ('channel_type', '=', 'chat')
        ]],
        {'fields': ['id'], 'limit': 1}
    )

    if channels:
        channel_id = channels[0]['id']
    else:
        # 🛠️ Créer un nouveau canal privé
        channel_id = models.execute_kw(
            db, uid, password,
            'mail.channel', 'create',
            [{
                'channel_partner_ids': [(6, 0, [partner_a, partner_b])],
                'channel_type': 'chat',
                'name': f'Chat {partner_a}-{partner_b}'
            }]
        )

    # ✉️ Poster le message dans le canal
    message_id = models.execute_kw(
        db, uid, password,
        'mail.channel', 'message_post',
        [channel_id],
        {
            'body': message,
            'message_type': 'comment',  # pour chat
            'author_id': auteur_id
        }
    )

    return jsonify({'status': 'sent', 'message_id': message_id})
