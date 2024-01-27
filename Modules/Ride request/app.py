from flask import Flask, request, jsonify
from collections import defaultdict

app = Flask(__name__)

ride_requests = defaultdict(list)
accepted_rides = defaultdict(str)

@app.route('/request_ride', methods=['POST'])
def request_ride():
    data = request.get_json()

    if 'user_id' not in data or 'latitude' not in data or 'longitude' not in data:
        return jsonify({'error': 'Invalid request parameters'}), 400

    user_id = data['user_id']
    latitude = data['latitude']
    longitude = data['longitude']

    
    ride_requests[(latitude, longitude)].append(user_id)

    return jsonify({'message': 'Ride request sent successfully'}), 200

@app.route('/accept_ride/<user_id>', methods=['GET'])
def accept_ride(user_id):
    for key, value in ride_requests.items():
        if value and value[0] == user_id:
            
            ride_requests[key].remove(user_id)

            
            accepted_rides[key] = user_id
            return jsonify({'message': f'Ride accepted for user {user_id}'}), 200

    return jsonify({'message': 'No available rides for the specified user'}), 404

@app.route('/cancel_ride/<user_id>', methods=['DELETE'])
def cancel_ride(user_id):
    for key, value in accepted_rides.items():
        if value == user_id:
            
            accepted_rides[key] = ''
            return jsonify({'message': f'Ride canceled for user {user_id}'}), 200

    return jsonify({'message': 'No active ride found for the specified user'}), 404

@app.route('/get_accepted_ride/<user_id>', methods=['GET'])
def get_accepted_ride(user_id):
    for key, value in accepted_rides.items():
        if value == user_id:
            return jsonify({'message': f'Ride details for user {user_id}', 'location': key}), 200

    return jsonify({'message': 'No active ride found for the specified user'}), 404

if __name__ == '__main__':
    app.run(debug=True)
