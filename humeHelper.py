from hume import HumeBatchClient
from hume.models.config import ProsodyConfig, BurstConfig

HUME_API_KEY = "syAoutXKFXn0TRtVhaX4iwAADEwpKLSseQLsLyBNIsF9CEaY"
badEmotions = set(["Anger", "Anxiety", "Awkwardness", "Boredom", "Confusion", "Disappointment", "Disgust", "Distress", "Embarrassment", "Fear", "Guilt", "Horror", "Pain", "Sadness", "Shame", "Tiredness"])
goodEmotions = set(["Calmness", "Concentration", "Determination", "Excitement", "Interest", "Joy", "Sympathy"])

class HumeHelper():

    def getAudio(audioFilePath):
        client = HumeBatchClient(HUME_API_KEY)
        filepaths = [
            audioFilePath,
        ]
        prosodyConfig = ProsodyConfig()
        burstConfig = BurstConfig()


        job = client.submit_job(None, [prosodyConfig], files=filepaths)

        print("Running HumeHelper...")

        details = job.await_complete()
        jsonRet = job.get_predictions()
        predictions = jsonRet[0]["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"][0]["predictions"]
        transcript = ""
        emotionMap = None
        for prediction in predictions:
            transcript += " " + prediction["text"]
            if emotionMap == None:
                emotionMap = {}
                for emotion in prediction["emotions"]:
                    emotionMap[emotion['name']] = emotion['score']
            else:
                for emotion in prediction["emotions"]:
                    emotionMap[emotion['name']] =+ emotion['score']
        for key in emotionMap:
            emotionMap[key] /= len(predictions)
        score = 0
        emotionList = []
        for key in emotionMap:
            if key in badEmotions:
                score -= emotionMap[key]
            if key in goodEmotions:
                score += emotionMap[key]*4
            if key in goodEmotions or key in badEmotions:
                emotionList.append((-emotionMap[key], key))
        score = int((score + 0.5) * 100)
        emotionList.sort()
        topThreeEmotions = [(tup[1], round(-tup[0]*10000)/1000) for tup in emotionList[:3]]

        toJson = {}
        toJson["transcript"] = transcript
        toJson["score"] = score
        toJson["top_emotions"] = topThreeEmotions
        toJson.headers.add('Access-Control-Allow-Origin', '*')
        print("HumeHelper completed!")
        return toJson
