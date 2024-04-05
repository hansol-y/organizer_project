import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import logo from '../../logo.svg';

const backendPort = process.env.BACKEND_PORT;
const serverBaseUrl = `http://localhost:${backendPort}`;
const userApiEndpoint = `${serverBaseUrl}/api/user`;
const moodApiEndpoint = `${serverBaseUrl}/api/mood`;

const getTodaysMood = async (userId) => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    try {
        const response = await axios.get(`/date/${date}`, {
            headers: {
                userId: userId
            }
        });

        if (response.status == 204) {
            // no contents
            return;
        } else if (response.status == 201) {
            return response.body; // getting list of moods in today
        } else {
            throw Error(response);
        }


    } catch (error) {
        alert(`Failed to load today's mood: ${error.message}`);
    }
};

const dashboard = async () => {
    // const navigate = useNavigate();
    const location = useLocation();
    const user = location.state.user;

    const createMoodReq = () => {
        // navigate("/Create");
    }

    const moveToCoordinate = () => {
        // navigate("/Coor")
    }

    const moveToHistory = () => {
        // navigate("/History")
    }

    const moveSuggestions = () => {
        // navigate("/Suggestion")
    }

    const todaysData = await getTodaysMood();

    return (
        <div className='dashboard'>
            <header className='dashboard-header'>
                <h1 className='title'>
                    Dashboard
                </h1>
            </header>
            <div className='sidemenu'>
                <img src={logo} className="small-logo" alt="logo" />
                <div className='menu-list'>
                    <ul id='menu-content' className='menu-content'>
                        <li>
                            <a href='./scenes/mood/createMood.js'>
                                <i className='menu'>Mood History</i>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div className='coordinate'>

            </div>
        </div>
    )


}

export default dashboard;