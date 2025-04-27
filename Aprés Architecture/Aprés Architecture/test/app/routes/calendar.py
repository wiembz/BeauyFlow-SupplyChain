from flask import Blueprint, jsonify

calendar_routes = Blueprint('calendar_routes', __name__)

# 🔥 Fake API calendrier
@calendar_routes.route('/api/calendar/events', methods=['GET'])
def get_calendar_events():
    events = [
        {
            'title': 'Réunion Projet A',
            'start': '2025-04-30T10:00:00',
            'end': '2025-04-30T12:00:00',
        },
        {
            'title': 'Revue Budget',
            'start': '2025-05-01T14:00:00',
            'end': '2025-05-01T15:30:00',
        }
    ]
    return jsonify(events)
    