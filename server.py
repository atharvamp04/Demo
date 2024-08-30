from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

def verify_behavior(data):
    mouse_movements = data['mouseMovements']
    typing_data = data['typingData']

    print('Received Mouse Movements:', mouse_movements)  # Log received data
    print('Received Typing Data:', typing_data)

    if len(mouse_movements) < 10:
        print('Not enough mouse movements')  # Log issue
        return False

    typing_intervals = [
        typing_data[i]['time'] - typing_data[i-1]['time']
        for i in range(1, len(typing_data))
    ]
    average_typing_speed = (
        sum(typing_intervals) / len(typing_intervals)
        if typing_intervals
        else float('inf')
    )

    print('Typing Intervals:', typing_intervals)  # Log intervals
    print('Average Typing Speed:', average_typing_speed)  # Log average speed

    if average_typing_speed < 50 or average_typing_speed > 1000:
        print('Typing speed out of range')  # Log issue
        return False

    return True

@app.route('/verify', methods=['POST'])
def verify():
    data = request.json
    verified = verify_behavior(data)
    print('Verification Result:', verified)  # Log result
    return jsonify({"verified": verified})

if __name__ == '__main__':
    app.run(debug=True)
