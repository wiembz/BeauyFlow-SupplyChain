from flask import Blueprint, request, jsonify
from app.models.odoo_connector import models, uid, db, password

chat_routes = Blueprint('chat_routes', __name__)

@chat_routes.route('/api/chat/send', methods=['POST'])
def envoyer_message():
    data = request.get_json()
    auteur_id = int(data.get('auteur_id'))
    destinataire_id = int(data.get('destinataire_id'))
    message = data.get('message')

    try:
        # 🔥 Récupérer le partner_id de l'auteur
        auteur_user = models.execute_kw(
            db, uid, password,
            'res.users', 'read',
            [[auteur_id]],   # DOUBLE LISTE
            {'fields': ['partner_id']}
        )

        if not auteur_user or not auteur_user[0].get('partner_id'):
            return jsonify({'status': 'error', 'error': 'Auteur introuvable'}), 400

        partner_auteur_id = auteur_user[0]['partner_id'][0]  # 🎯 ID du partenaire de l'auteur

        # 🔥 Récupérer partner_id du destinataire
        dest_user = models.execute_kw(
            db, uid, password,
            'res.users', 'read',
            [[destinataire_id]],   # DOUBLE LISTE
            {'fields': ['partner_id']}
        )

        if not dest_user or not dest_user[0].get('partner_id'):
            return jsonify({'status': 'error', 'error': 'Destinataire introuvable'}), 400

        partner_dest_id = dest_user[0]['partner_id'][0]

        # ✅ Envoyer la notification dans Odoo avec le BON auteur (partner_auteur_id)
        message_id = models.execute_kw(
            db, uid, password,
            'mail.message', 'create',
            [{
                'model': 'res.users',
                'res_id': destinataire_id,
                'body': f"{message}",
                'subject': 'Nouveau message',
                'message_type': 'notification',
                'subtype_id': 1,
                'author_id': partner_auteur_id,   # PARTNER ID DE L'AUTEUR
                'partner_ids': [(6, 0, [partner_dest_id])]
            }]
        )

        return jsonify({'status': 'sent', 'message_id': message_id}), 200

    except Exception as e:
        print('Erreur envoi message:', e)
        return jsonify({'status': 'error', 'error': str(e)}), 500
