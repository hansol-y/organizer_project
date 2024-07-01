import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';

import logo from '../../assets/coordinate_s.png';

import './Mood.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const serverBaseUrl = `${backendUrl}`;
const moodApiEndpoint = `${serverBaseUrl}/api/mood`;
const predictionBaseUrl = process.env.REACT_APP_PREDICTION_URL;

const colorBoard = {"happy": "FFFFFF"}

const Suggestion = () => {

    const location = useLocation();
    const { userId, password, username, email, token } = location.state;
    const chartRef = useRef(null);
    let ratio = null;
    const [prediction, setPrediction] = useState(null);

    const getPrediction = async() => {
        try {
            const response = await axios.get(`${moodApiEndpoint}/last-six-month`,
            {
                headers: {
                    Authorization: `${token}`
                }
            });

            if (response.status === 200) {
                console.log(response);
                const records = response.data;

                const anal_res = await axios.post(`${predictionBaseUrl}/analysis/mood_percentage`,
                    {
                        "records": records
                    }
                )
                if (anal_res.status === 200) {
                    ratio = anal_res.data["percentage_analysis"];
                    console.log('Ratio: ');
                    console.log(ratio);
                    drawPieChart(ratio);
                } else {
                    throw Error("Cannot get the analysis data.");
                }

                const next_prediction = await axios.post(`${predictionBaseUrl}/prediction/mood`,
                    {
                        "records": records
                    }
                )

                if (next_prediction.status === 200) {
                    setPrediction(next_prediction.data["prediction"]);
                } else {
                    throw Error()
                }
            } else if (response.status === 204) {
                throw Error("You haven't recorded any feelings this month. We provide the suggestion based on your mood records in a month.")
            } else {
                throw Error()
            }
        } catch(error) {
            alert(error.message);
        }
    }

    const drawPieChart = (ratio) => {
        console.log("Drawing pie chart");
        console.log("Checking ratio");
        console.log(ratio["happy"]);
        const data = {
            labels: [
                "happy",
                "sad",
                "angry",
                "anxious",
                "calm",
                "energetic"
            ],
            datasets: [{
                data: [ratio["happy"], ratio["sad"], ratio["angry"], ratio["anxious"], ratio["calm"], ratio["energetic"]]
            }]
        };

        const ctx = document.getElementById('pie-chart-suggestion').getContext('2d');
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx,
            {
                type: 'pie',
                data: data
            }
        );
    }

    // getPrediction();

    useEffect(() => {
        getPrediction();

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);
    

    return (
        <div className='mood-history'>
            <header className='mood-history-header'>
                <h1 className='title'>
                    Suggestions on Your Current Mood
                </h1>
            </header>
            <div className='predict-mood'>
                Your latest moods were...
                <div className='present-mood'>
                    <div className='pie-chart'>
                        <canvas id='pie-chart-suggestion'></canvas>
                    </div>
                </div>
                
                <br />
                <br />

                Based on your recent mood trend, your next mood might be...
                
                <div className='present-prediction'>
                    {prediction}
                </div>
            </div>
        </div>
    )
}

export default Suggestion;