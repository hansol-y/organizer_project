import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import Chart from 'chart.js/auto';
import axios from 'axios';


const backendUrl = process.env.REACT_APP_BACKEND_URL;
const serverBaseUrl = `${backendUrl}`;
const moodApiEndpoint = `${serverBaseUrl}/api/mood`;

const MoodHistory = () => {

    const location = useLocation();
    const { userId, password, username, email, token } = location.state;

    const countMoods = (records) => {
        return records.reduce((acc, record) => {
            if (acc.hasOwnProperty(record.mood)) {
                acc[record.mood] += 1;
            }
            return acc;
        }, {
            happy: 0,
            sad: 0,
            angry: 0,
            anxious: 0,
            calm: 0,
            energetic: 0
        });
    };

    const date = new Date();

    const getMonthlyMoods = async (month, year) => {
        try {
            const response = await axios.get(`${moodApiEndpoint}/month`,
            {
                headers: {
                    Authorization: `${token}`
                },
                params: {
                    month: month,
                    year: year
                }
            });
    
            if (response.status === 201) {
                return response.data;
            } else if (response.status === 204) {
                throw Error("No data exists.");
            } else {
                throw Error("Unable to load mood data. Please try again.");
            }
        } catch(error) {
            alert(error.message);
        }
    }

    const handleForSubmit = async (values) => {
        const {month, year} = values;
        const records = await getMonthlyMoods(month, year);
        const count = await countMoods(records);
        drawPieChart(count, month, year);
    }

    const drawPieChart = (count, month, year) => {
        console.log("Drawing pie chart");
        console.log(count, month, year);
        const data = {
            labels: [
                "happy",
                "sad",
                "angry",
                "anxious",
                "calm",
                "energetic"
            ],
            datasets: [{
                label: `My Mood Graph in ${month}/${year}`,
                data: [count.happy, count.sad, count.angry, count.anxious, count.calm, count.energetic]
            }]
        };

        console.log(data);
        
        const ctx = document.getElementById('pie-chart').getContext('2d');
        new Chart(ctx,
            {
                type: 'pie',
                data: data
            }
        )
    }


    return (
        <div className='mood-history'>
            <header className='mood-history-header'>
                <h1 className='title'>
                    Your Mood History
                </h1>
            </header>
            <p>
                Please select the month and year of the data you want to bring
            </p>
            <Formik initialValues={{
                month: date.getMonth() + 1,
                year: date.getFullYear()
            }}
                onSubmit={handleForSubmit}>
                {
                    <Form className='mood-date-form'>
                        <label htmlFor='month'>Month</label>
                        <br />
                        <Field name="month" />
                        <br />

                        <label htmlFor='year'>Year</label>
                        <br />
                        <Field name="year" />
                        <br />

                        <button className="year" type="submit">Submit</button>
                    </Form>
                }
            </Formik>
                <div className='pie-chart'>
                    <canvas id='pie-chart'></canvas>
                </div>
        </div>
    )
}

export default MoodHistory;
