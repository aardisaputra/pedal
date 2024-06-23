from openai import OpenAI

system_prompt = "You are a typical middle school student who knows about as much as a typical middle schoold student would. You will be given a lecture and will learn from it. You will then be asked to complete a quiz and must ONLY use the information learnt from the lecture to answer it."

OPEN_AI_KEY = "sk-proj-wN0dBaSzfmjCG2wnPv4HT3BlbkFJGj3aVCzlq9Mw6LeWEwgk"

class LlamaHelper():

    def getScore(lecture_transcript, quiz):
        client = OpenAI(api_key=OPEN_AI_KEY)
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f'''Listen to the follwoing lecture: "{lecture_transcript}" Using only the information you learnt from that lecture, answer the following question: "{quiz}"'''}
        ]
        )
        print(completion.choices[0].message)
        toJson = {}
        toJson["score"] = 10
        toJson["answer"] = str(completion.choices[0].message)
        return toJson