import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-dropdown';

import Canvas from './coordinate/Canvas';

import './Board.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const serverBaseUrl = `${backendUrl}`;
const moodApiEndpoint = `${serverBaseUrl}/api/mood`;

const COLOR_CODE = {"happy":"#FFD700", "sad":"#1E90FF", "angry":"#FF4500", "calm":"#00CED1", "energetic":"#32CD32"}
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const Dashboard = () => {
    const location = useLocation();
    console.log("Getting user data from react-router-dom location");
    console.log(location);
    const { userId, password, username, email, token } = location.state;
    const [ mood, setMood ] = useState();
    const [ strength, setStrength ] = useState(0);
    const [ coordinates, setCoordinates ] = useState([]);

    const createNewMood = async (mood, strength, personal, activeness) => {
        try {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const date = today.getDate();
            const hour = today.getHours();
            const minute = today.getMinutes();
            const seconds = today.getSeconds();
            const day = today.getDay();

            const response = await axios.post(`${moodApiEndpoint}`, 
            {
                mood: mood,
                strength: strength,
                personal: personal,
                activeness: activeness,
                year: year,
                month: month,
                date: date,
                hour: hour,
                minute: minute,
                second: seconds,
                day: day
            },
            {
                headers: {
                    Authorization: `${token}`
                }
            });

            if (response.status === 201) {
                alert(`Successfully created a new mood!`);
            } else {
                throw Error(response.message);
            }

            setMood(null);
            setStrength(0);
            setCoordinates([]);

        } catch(error) {
            alert(`Failed to create a new mood: ${error.message}`);
        }
    }

    const handleForMoodClick = (event) => {
        setMood(event.target.value);
    }

    const handleForStrength = (option => {
        setStrength(option.value);
        console.log(`strength: ${strength}`);
    })

    useEffect(() => {
        console.log("Changes in coordinates deteced");
        console.log(mood, strength, coordinates);
        if (mood && strength && coordinates.length > 0) {
            console.log("Creating new mood now...");
            createNewMood(mood, strength, coordinates[0], coordinates[1]);
        }
    }, [coordinates])

    

    return (
        <div className='dashboard'>
            <header className='dashboard-header'>
                <h1 className='title'>
                    Dashboard
                </h1>
            </header>

            <div className='mood-buttons'>
                <button name='happy' value='happy' style={{ backgroundColor: COLOR_CODE["happy"] }} onClick={handleForMoodClick}>Happy</button>
                <button name='sad' value='sad' style={{ backgroundColor: COLOR_CODE["sad"] }} onClick={handleForMoodClick}>Sad</button>
                <button name='angry' value='angry' style={{ backgroundColor: COLOR_CODE["angry"] }} onClick={handleForMoodClick}>Angry</button>
                <button name='calm' value='calm' style={{ backgroundColor: COLOR_CODE["calm"] }} onClick={handleForMoodClick}>Calm</button>
                <button name='energetic' value='energetic' style={{ backgroundColor: COLOR_CODE["energetic"] }} onClick={handleForMoodClick}>Energetic</button>
            </div>

            {mood && (
                <Dropdown
                    className='strength'
                    options = {[1, 2, 3, 4, 5]}
                    onChange={handleForStrength}
                    placeholder="Select the strength of your mood"
                />
            )}
            
            <div className='coordinate'>
                <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} mood={mood} strength={strength} setCoordinates={setCoordinates}/>
            </div>
        </div>
    );


}

export default Dashboard;