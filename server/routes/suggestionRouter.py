from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestRegressor
# from dotenv import load_dotenv
from collections import deque

# load_dotenv() # TODO: finish up getting env data

app = Flask(__name__)
CORS(app)

LABEL_TO_MOOD = {0: "happy", 1: "sad", 2: "angry", 3: "calm", 4: "anxious", 5: "energetic"}
MOOD_TO_LABEL = {"happy": 0, "sad": 1, "angry": 2, "calm": 3, "anxious": 4, "energetic": 5}

@app.route('/prediction/time', methods=['POST'])
def predict_by_time():
    print("Getting prediction by time")
    json_data = request.get_json()
    records = json_data.get('records')
    day = request.args.get('day')
    model = RandomForestRegressor(random_state=42)
    
    if len(records) < 30:  # Not enough data
        return jsonify({"prediction": "need more data for prediction"}), 500
    
    X = [] # X = [time quarter, day]
    y = [] # Y = mood
    
    for record in records:
        X.append([set_time_quarter(record["hour"]), record["day"]])
        y.append(label_mood_data(record["mood"]))
    
    model.fit(X, y)
    
    res = model.predict([[0, day], [1, day], [2, day]]) # day comes from conditions
    
    return jsonify({"prediction": {"morning": convert_label_to_mood(res[0]), "afternoon": convert_label_to_mood(res[1]), "night": convert_label_to_mood(res[2])}}), 200
    
    
@app.route('/prediction/mood', methods=['POST'])
def predict_by_previous_moods():
    json_data = request.get_json()
    records = json_data.get('records')
    model = RandomForestRegressor(random_state=42)
    
    if len(records) < 30:
        return jsonify({"prediction": "need more data for prediction"}), 500
    
    prevs = deque()
    prevs.extend([label_mood_data(records[0]["mood"]), label_mood_data(records[1]["mood"]), label_mood_data(records[2]["mood"])])
    X = []
    y = []
    
    for record in records[3:]:
        X.append(prevs)
        y.append(label_mood_data(record['mood']))
        prevs.popleft()
        prevs.append(label_mood_data(record['mood']))
        
    model.fit(X, y)
    
    res = model.predict([prevs])
    
    print(res)
    
    return jsonify({"prediction": convert_label_to_mood(res[0])}), 200

# @app.route('/analysis/mood_percentage', methods=['GET'])
# def analyse_given_moods():
#     records = request.json
#     for record in records:
#         record
    
def set_time_quarter(time):
    if 0 <= time < 7:
        return 0 # dawn
    elif 7 <= time < 12:
        return 1 # morning
    elif 12 <= time < 7:
        return 2 # afternoon
    else:
        return 3 # night
    
def label_mood_data(mood):
    return MOOD_TO_LABEL[mood]
    
def convert_label_to_mood(label):
    return LABEL_TO_MOOD[label]
    
if __name__ == '__main__':
    app.run(debug=True, port=8000)