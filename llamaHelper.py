from openai import OpenAI

system_prompt = "You are a typical middle school student who knows about as much as a typical middle schoold student would. You will be given a lecture and will learn from it. You will then be asked to complete a quiz and must ONLY use the information learnt from the lecture to answer it. Furthermore, ONLY answer with THREE and EXACTLY THREE letters referring to the correct answer choices. For example, to answer A for question 1, B for question 2, and A for question 3, simply respond with ABA and nothing else. If you write anything more than three characters, I will cut off my leg."
NUM_QUESTIONS = 3

def quizParser(quiz):
        quizString = ""
        for question in quiz["questions"]:
            quizString += question["question"] + '\n'
            for option in question["options"]:
                quizString += f'{option}) {question["options"][option]}\n'
            quizString += '\n'
        return quizString

class LlamaHelper():

    def getScore(lecture_transcript, quiz):
        client = OpenAI(api_key="sk-proj-iLqa6Y92fvHrJaeT6r5AT3BlbkFJtd7WggHM3sy57q9eIE4L")
        
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f'''Listen to the follwoing lecture: "{lecture_transcript}" Using only the information you learnt from that lecture, answer the following three questions, formatting your answer as ONLY three letters like "ADC": "{quizParser(quiz)}"'''}
        ]
        )
        # answer = str(completion.choices[0].message)
        answer = completion.choices[0].message.content
        correct_ans = 0
        for i in range(3):
            if answer[i] == quiz["questions"][i]["correct_answer"]:
                correct_ans += 1
            quiz["questions"][i]["gpt_answer"] = answer[i]
        toJson = {}
        toJson["score"] = int(correct_ans*(100/NUM_QUESTIONS))
        toJson["quiz"] = quiz
        return toJson
    
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

print(quizParser(quiz))