from flask import Flask, jsonify, request
from humeHelper import HumeHelper
from llamaHelper import LlamaHelper
import os
from flask_cors import CORS

quiz = {
  "questions": [
    {
      "question": "What is the powerhouse of the cell?",
      "options": {
        "A": "Nucleus",
        "B": "Mitochondria",
        "C": "Ribosome",
        "D": "Chloroplast"
      },
      "correct_answer": "B"
    },
    {
      "question": "Which organelle is responsible for photosynthesis in plant cells?",
      "options": {
        "A": "Mitochondria",
        "B": "Chloroplast",
        "C": "Ribosome",
        "D": "Endoplasmic Reticulum"
      },
      "correct_answer": "B"
    },
    {
      "question": "What structure controls the movement of substances in and out of the cell?",
      "options": {
        "A": "Cell membrane",
        "B": "Nucleus",
        "C": "Cytoplasm",
        "D": "Lysosome"
      },
      "correct_answer": "A"
    }
  ]
}

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Flask server!"

@app.route('/api/data', methods=['GET'])
def get_data():
    # Example endpoint that returns some data
    humeData = HumeHelper.getAudio("/Users/aardisaputra/Downloads/recording.webm")
    llamaData = LlamaHelper.getScore(humeData['transcript'], quiz)
    data = {
        'content_score': llamaData['score'],
        'delivery_score': humeData['score'],
        'top_emotions': humeData['top_emotions'],
        'quiz': llamaData['quiz'],
        'transcript': humeData['transcript'] #will remove
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
    CORS(app)
    app.run(debug=True)
