import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';

const moodApiEndpoint = "api/mood";

const MoodCoord = () => {

    // here the user can get the moods and display it on coordinate as they choose

    



    return (
        <div className='mood-history'>
            <header className='mood-history-header'>
                <h1 className='title'>
                    Checking Your Mood Coordinate Today
                </h1>
            </header>
            <div className=''>
            </div>
        </div>
    )
}

export default MoodCoord;