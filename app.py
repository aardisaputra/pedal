from flask import Flask, jsonify, request
from humeHelper import HumeHelper
from llamaHelper import LlamaHelper

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Flask server!"

@app.route('/api/data', methods=['GET'])
def get_data():
    # Example endpoint that returns some data
    humeData = HumeHelper.getAudio("haas.wav")
    llamaData = LlamaHelper.getScore(humeData['transcript'])
    data = {
        'content_score': llamaData['score'],
        'delivery_score': humeData['score'],
        'top_emotions': humeData['top_emotions'],
    }
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    # Example endpoint that receives data and returns a response
    received_data = request.json
    response = {
        'received_data': received_data,
        'status': 'success'
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
