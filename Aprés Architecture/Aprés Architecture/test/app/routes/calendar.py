from flask import Blueprint, jsonify, request
import xmlrpc.client
from app.models.odoo_connector import url, db, username, password

calendar_api = Blueprint('calendar_api', __name__)

@calendar_api.route('/api/calendar/events', methods=['GET'])
def get_events():
    try:
        common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
        uid = common.authenticate(db, username, password, {})
        models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

        events = models.execute_kw(
            db, uid, password,
            'calendar.event', 'search_read',
            [[]],
            {'fields': ['id', 'name', 'start', 'stop', 'user_id']}
        )

        return jsonify(events)
    
    except Exception as e:
        print('❌ Error fetching events:', e)
        return jsonify({'error': str(e)}), 500

@calendar_api.route('/api/calendar/events', methods=['POST'])
def create_event():
    try:
        data = request.json
        name = data.get('name')
        start = data.get('start')
        stop = data.get('stop')
        user_id = data.get('user_id')

        common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
        uid = common.authenticate(db, username, password, {})
        models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

        event_id = models.execute_kw(
            db, uid, password,
            'calendar.event', 'create',
            [{
                'name': name,
                'start': start,
                'stop': stop,
                'user_id': user_id
            }]
        )

        return jsonify({'id': event_id}), 201

    except Exception as e:
        print('❌ Error creating event:', e)
        return jsonify({'error': str(e)}), 500

@calendar_api.route('/api/calendar/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        data = request.json
        name = data.get('name')
        start = data.get('start')
        stop = data.get('stop')

        common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
        uid = common.authenticate(db, username, password, {})
        models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

        models.execute_kw(
            db, uid, password,
            'calendar.event', 'write',
            [[event_id], {
                'name': name,
                'start': start,
                'stop': stop
            }]
        )

        return jsonify({'message': 'Event updated successfully'})

    except Exception as e:
        print('❌ Error updating event:', e)
        return jsonify({'error': str(e)}), 500

@calendar_api.route('/api/calendar/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
        uid = common.authenticate(db, username, password, {})
        models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

        models.execute_kw(
            db, uid, password,
            'calendar.event', 'unlink',
            [[event_id]]
        )

        return jsonify({'message': 'Event deleted successfully'})

    except Exception as e:
        print('❌ Error deleting event:', e)
        return jsonify({'error': str(e)}), 500
