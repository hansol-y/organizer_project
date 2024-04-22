import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';

const moodApiEndpoint = "api/mood";

const MoodHistory = () => {
    
    // here user can get the statistics data based on month

    return (
        <div className='mood-history'>
            <header className='mood-history-header'>
                <h1 className='title'>
                    Your Mood History
                </h1>
            </header>
            <div className=''>
            </div>
        </div>
    )
}

export default MoodHistory;