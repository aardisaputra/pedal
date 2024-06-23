from flask import Flask, jsonify, request
from humeHelper import HumeHelper
from llamaHelper import LlamaHelper
import os
from flask_cors import CORS
import time

LAMB = 0.5

QUIZES = {
  "biology": {
    "topic": "Cell Structure",
    "questions": [
      {
        "question": "What is the powerhouse of the cell?",
        "options": {
          "A": "Nucleus",
          "B": "Ribosome",
          "C": "Mitochondrion",
          "D": "Endoplasmic Reticulum"
        },
        "correct_answer": "C"
      },
      {
        "question": "Which organelle is responsible for protein synthesis?",
        "options": {
          "A": "Lysosome",
          "B": "Ribosome",
          "C": "Golgi Apparatus",
          "D": "Vacuole"
        },
        "correct_answer": "B"
      },
      {
        "question": "What is the function of the nucleus in a cell?",
        "options": {
          "A": "Produces energy",
          "B": "Synthesizes proteins",
          "C": "Contains genetic material",
          "D": "Packages and distributes proteins"
        },
        "correct_answer": "C"
      }
    ]
  },
  "geography": {
    "topic": "Continents and Oceans",
    "questions": [
      {
        "question": "Which is the largest continent by land area?",
        "options": {
          "A": "Africa",
          "B": "Asia",
          "C": "North America",
          "D": "Europe"
        },
        "correct_answer": "B"
      },
      {
        "question": "Which ocean is the deepest?",
        "options": {
          "A": "Atlantic Ocean",
          "B": "Indian Ocean",
          "C": "Arctic Ocean",
          "D": "Pacific Ocean"
        },
        "correct_answer": "D"
      },
      {
        "question": "Which continent is known as the 'Frozen Continent'?",
        "options": {
          "A": "Antarctica",
          "B": "Australia",
          "C": "Europe",
          "D": "South America"
        },
        "correct_answer": "A"
      }
    ]
  },
  "history": {
    "topic": "American Revolutionary War",
    "questions": [
      {
        "question": "Who was the primary author of the Declaration of Independence?",
        "options": {
          "A": "George Washington",
          "B": "Benjamin Franklin",
          "C": "Thomas Jefferson",
          "D": "John Adams"
        },
        "correct_answer": "C"
      },
      {
        "question": "In which year did the American Revolutionary War officially begin?",
        "options": {
          "A": "1775",
          "B": "1776",
          "C": "1781",
          "D": "1783"
        },
        "correct_answer": "A"
      },
      {
        "question": "Which battle is considered the turning point of the American Revolutionary War?",
        "options": {
          "A": "Battle of Bunker Hill",
          "B": "Battle of Saratoga",
          "C": "Battle of Yorktown",
          "D": "Battle of Lexington and Concord"
        },
        "correct_answer": "B"
      }
    ]
  }
}

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Flask server!"

@app.route('/api/data', methods=['GET'])
def get_data():
    # Example endpoint that returns some data
    audio_path = "/Users/owengozali/Downloads/recording.webm"
    while not os.path.exists(audio_path):
        print("Waiting for file to download...")
        time.sleep(0.5)
    humeData = HumeHelper.getAudio(audio_path)
    llamaData = LlamaHelper.getScore(humeData['transcript'], QUIZES["history"])
    data = {
        'overall_score': round((1-LAMB)*llamaData['score'] + LAMB * humeData['score']),
        'content_score': llamaData['score'],
        'delivery_score': humeData['score'],
        'top_emotions': humeData['top_emotions'],
        'quiz_colors': llamaData['quiz_colors'],
        'quiz': llamaData['quiz'],
        'transcript': humeData['transcript'] #will remove
    }
    print(data)
    response = {
        "ok": "true",
        "message": f"Data has been fetched.",
        "data": data,
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
