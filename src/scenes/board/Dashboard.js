import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import logo from '../../logo.svg';
import user_img from '../../assets/user.png'

import './Board.css';

const userApiEndpoint = "api/user";
const moodApiEndpoint = "api/mood";

const getTodaysMood = async (_id) => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    try {
        const response = await axios.get(`${moodApiEndpoint}/date/${date}`, {
            headers: {
                _id: _id
            }
        });

        if (response.status === 204) {
            // no contents
            return;
        } else if (response.status === 201) {
            return response.body; // getting list of moods in today
        } else {
            throw Error(response);
        }
    } catch (error) {
        alert(`Failed to load today's mood: ${error.message}`);
    }
};

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("Getting user data from react-router-dom location");
    console.log(location);
    const { userId, password, username, email, token } = location.state;

    const navigateAddMood = () => {
        navigate('/Create', {state: {userId: userId, password: password, username: username, email: email, token: token}});
    }

    return (
        <div className='dashboard'>
            <header className='dashboard-header'>
                <h1 className='title'>
                    Dashboard
                </h1>
            </header>
            
            <div className='coordinate'>
                <hr className='coord-hr' />
                <hr className='coord-vr' />
            </div>
            <button className='add-mood' onClick={navigateAddMood}>
                Add Mood
            </button>
        </div>
    );


}

export default Dashboard;