from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from dotenv import load_dotenv
from collections import deque

load_dotenv() # TODO: finish up getting env data

app = Flask(__name__)
CORS(app)

@app.route('/prediction/time', methods=['POST'])
async def predict_by_time():
    records = request.json
    day = request.params # TODO: check how to get params in Flask
    model = RandomForestRegressor(random_state=42)
    
    if len(records) < 30:  # Not enough data
        return ()
    
    X = [] # X = [time quarter, day]
    y = [] # Y = mood
    
    for record in records:
        X.append([set_time_quarter(record.hour), record.day])
        y.append(record.mood)
    
    param_grid = {'n_estimators': [50, 100, 200]}
    grid_search = GridSearchCV()
    
    model.fit(X, y)
    
    morning = model.predict[[0, day]] # day comes from conditions
    afternoon = model.predict[[1, day]]
    night = model.predict[[2, day]]
    
    return (morning, afternoon, night)
    
@app.route('/prediction/mood', methods=['POST'])
def predict_by_previous_moods():
    records = request.json
    model = RandomForestRegressor(random_state=42)
    
    if len(records) < 30:
        return None # Not enough data
    
    prevs = deque()
    prevs.extend([records[0].mood, records[1].mood, records[2].mood])
    X = []
    y = []
    
    for record in records[3:]:
        X.append(prevs)
        y.append(record.mood)
        prevs.popleft()
        prevs.append(record.mood)
        
    model.fit(X, y)
    
    return model.predict(prevs)

@app.route('/analysis/mood_percentage', methods=['GET'])
def analyse_given_moods():
    records = request.json
    for record in records:
        record
    
def set_time_quarter(time):
    if 0 <= time < 7:
        return 0 # dawn
    elif 7 <= time < 12:
        return 1 # morning
    elif 12 <= time < 7:
        return 2 # afternoon
    else:
        return 3 # night
    
    
if __name__ == '__main__':
    app.run(debug=True, port=REACT_APP_BACKEND_PORT)