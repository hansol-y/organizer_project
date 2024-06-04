import useLocation from 'react-router-dom';

import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const location = useLocation();
import axios from 'axios';

const { userId, password, username, email, token } = location.state;

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const moodApiEndpoint = `${backendUrl}/api/mood`;

const classifier = knnClassifier.create();

export const getMonthlyMoods = async (month, year) => {
    try {
        const response = await axios.get(`${moodApiEndpoint}/month`,
        {},
        {
            headers: {
                Authorization: `${token}`
            },
            params: {
                month: month,
                year: year
            }
        });

        if (response.status === 201 || response.status === 204) {
            return response.data;
        } else {
            throw Error("Unable to load mood data. Please try again.");
        }
    } catch(error) {
        console.log(error.message);
    }
}

export const countMoods = (records) => {
    let counts = {
        happy: 0,
        sad: 0,
        angry: 0,
        anxious: 0,
        calm: 0,
        energetic: 0
    }

    for (const record of records) {
        switch(record.mood) {
            case "happy":
                counts.happy += 1;
                break;
            case "sad":
                counts.sad += 1;
                break;
            case "angry":
                counts.angry += 1;
                break;
            case "anxious":
                counts.anxious += 1;
                break;
            case "calm":
                counts.calm += 1;
                break;
            case "energetic":
                counts.energetic += 1;
                break;
            default:
                // ignore the record
                break;
        }
    }
    return counts;
}

export const predictHourlyMood = async (records) => {
    for (const record of records) {
        const rtf = tf.convert_to_tensor(record);
    }
}