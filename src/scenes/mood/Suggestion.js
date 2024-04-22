import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';

const moodApiEndpoint = "api/mood";

const Suggestion = () => {

    return (
        <div className='mood-history'>
            <header className='mood-history-header'>
                <h1 className='title'>
                    Suggestions on Your Current Mood
                </h1>
            </header>
            <div className=''>
            </div>
        </div>
    )
}

export default Suggestion;