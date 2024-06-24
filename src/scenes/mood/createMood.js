import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {Formik, Field, Form} from 'formik';

import logo from '../../logo.svg';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const serverBaseUrl = `${backendUrl}`;
const userApiEndpoint = `${serverBaseUrl}/api/user`;
const moodApiEndpoint = `${serverBaseUrl}/api/mood`;



const CreateMood = () =>  {

    const navigate = useNavigate();
    const location = useLocation();
    const { userId, password, username, email, token } = location.state;

    console.log(userId, password, username, email, token);

    

    const postMood = async(mood, strength, personal, activeness) => {
        try {

            const now = new Date();

            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const date = now.getDate();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const seconds = now.getSeconds();
            const day = now.getDay();

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

            if (response.status !== 201) {
                throw new Error(response.data);
            } else {
                alert("New mood is successfully created!");
                navigate('/Dashboard', {state: {userId: userId, password: password, username: username, email: email, token: token}});
            }
        } catch(error) {
            alert(`Failed to register this mood: ${error.message}`);
        }
    }

    const handleForMoodSubmit = async (values) => {
        const {mood, strength, personal, activeness, date} = values;
        postMood(mood, strength, personal, activeness, date);
    }

    return (
        <div className='mood-input'>
            <header className='mood-input-header'>
                <h1 className='title'>
                    Add Your Current Mood!
                </h1>
            </header>
            <div className='mood-form'>
                <Formik initialValues={{
                    mood: "",
                    strength: 0,
                    personal: 0,
                    activeness: 0,
                    year: null,

                }}
                    onSubmit={handleForMoodSubmit}>
                    {
                        <Form className='mood-create-form'>
                            <label htmlFor='mood'>Mood</label>
                            <br />
                            <Field name="mood" />
                            <br />
                            <br />
                            <label htmlFor='strength'>Strength (In 0-5)</label>
                            <br />
                            <Field name="strength" />
                            <br />
                            <br />
                            <label htmlFor='personal'>Personal (In 0-5)</label>
                            <br />
                            <Field name="personal" />
                            <br />
                            <br />
                            <label htmlFor='activeness'>Activeness (In 0-5)</label>
                            <br />
                            <Field name="activeness" />
                            <br />
                            <br />

                            <button className='submit' type='submit'>Add Mood</button>
                        </Form>
                    }

                </Formik>
            </div>
        </div>
    )
}

export default CreateMood;