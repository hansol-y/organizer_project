import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';
import Canvas from './coordinate/Canvas';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const serverBaseUrl = `${backendUrl}`;
const moodApiEndpoint = `${serverBaseUrl}/api/mood`;

const MoodCoord = () => {
    const [vectors, setVectors] = useState([]);
    const [error, setError] = useState(null);

    const location = useLocation();
    const { userId, password, username, email, token } = location.state;

    // here the user can get the moods and display it on coordinate as they choose

    // 1. get vectors
    const getVectors= async () => {
        try {
            // TODO: get vectors using GET API
            const today = new Date();
            const date = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            const response = await axios.get(`${moodApiEndpoint}/date`,
                {
                    params: {
                        date: date,
                        month: month,
                        year: year
                    },
                    headers: {
                        Authorization: token
                    }
                }
            );

            console.log(response);



            if (response.status === 201) {
                const moods = response.data;
                const vecs = []
                for (const mood of moods) {
                    vecs.push([mood.personal, mood.activeness, mood.strength]);
                }
                // X coordinate: personal, Y coordinate: activeness, length: stength
                setVectors(vecs);
            } else if (response.status === 204) {
                setVectors([]);
            } else {
                throw Error(`Unable to load data: ${response.data}`);
            }
        } catch(error) {
            setError(error);
        }
    };

    useEffect(() => {
        getVectors();
    }, []);


    return (
        <div className='mood-history'>
            <header className='mood-history-header'>
                <h1 className='title'>
                    Checking Your Mood Coordinate Today
                </h1>
            </header>
            <div className=''>
                {error && (
                    <p>{error.message}</p>
                )}
                <Canvas vectors={vectors} width={500} height={500} />
            </div>
        </div>
    )
}

export default MoodCoord;