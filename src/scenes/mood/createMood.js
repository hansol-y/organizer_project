import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import logo from '../../logo.svg';

const backendPort = process.env.BACKEND_PORT;
const serverBaseUrl = `http://localhost:${backendPort}`;
const userApiEndpoint = `${serverBaseUrl}/api/user`;
const moodApiEndpoint = `${serverBaseUrl}/api/mood`;

const createMood = async() =>  {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state.user;

    const postMood = async(mood, strength, personal, activeness, date) => {
        try {
            const response = await axios.post(`${moodApiEndpoint}`, 
            {
                mood: mood,
                strength: strength,
                personal: personal,
                activeness: activeness,
                date: date
            },
            {
                headers: {
                    userId: user.userId
                }
            });

            if (response.status != 201) {
                throw new Error(response.data);
            } else {
                alert("New mood is successfully created!");
                navigate('/Dashboard');
            }
        } catch(error) {
            alert(`Failed to register this mood: ${error.message}`);
        }
    }

    return (
        <div className='mood-input'>
            <header className='mood-input-header'>
                <h1 className='title'>
                    Add Your Current Mood!
                </h1>
            </header>
            <div className=''>
            </div>
        </div>
    )
}

export default createMood;