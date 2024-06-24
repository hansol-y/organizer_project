import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const serverBaseUrl = `${backendUrl}`;
const moodApiEndpoint = `${serverBaseUrl}/api/mood`;

const Suggestion = () => {

    const location = useLocation();
    const { userId, password, username, email, token } = location.state;
    let latest = null;

    const getPrediction = async() => {
        const today = new Date();
        try {
            const response = await axios.get(`${moodApiEndpoint}/month`,
            {
                headers: {
                    Authorization: `${token}`
                },
                params: {
                    month: today.getMonth() + 1,
                    year: today.getFullYear()
                }
            });

            if (response.status === 201) {
                // const predictedClass = predictNextMood(response.data);
                // console.log(predictedClass);
                // return predictedClass;

                // TODO: call prediction API
            } else if (response.status === 204) {
                throw Error("You haven't recorded any feelings this month. We provide the suggestion based on your mood records in a month.")
            } else {
                throw Error()
            }
        } catch(error) {
            alert(error.message);
        }
    }

    getPrediction();

    return (
        <div className='mood-history'>
            <header className='mood-history-header'>
                <h1 className='title'>
                    Suggestions on Your Current Mood
                </h1>
            </header>
            <div className='predict-mood'>
                Your latest mood was...
                <div className='present-mood'>

                </div>
                
                <br />
                <br />

                Based on your monthly mood trend, your next mood might be...
                <div className='present-prediction'>

                </div>
            </div>
        </div>
    )
}

export default Suggestion;