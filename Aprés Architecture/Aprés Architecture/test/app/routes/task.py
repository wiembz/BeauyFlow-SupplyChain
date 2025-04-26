from flask import Blueprint, jsonify
import xmlrpc.client
from app.models.odoo_connector import url, db, uid, password

task_routes = Blueprint('task_routes', __name__)

@task_routes.route('/api/tasks/<int:user_id>', methods=['GET'])
def get_tasks(user_id):
    # Reconnexion propre à Odoo
    models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")

    # Utilise ici le champ qui marche vraiment (user_id ou autre)
    try:
        tasks = models.execute_kw(
            db, uid, password,
            'project.task', 'search_read',
            [[('user_id', '=', user_id)]],  # <-- adapte ici si besoin
            {'fields': ['name', 'stage_id', 'date_deadline']}
        )
        return jsonify(tasks)
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
