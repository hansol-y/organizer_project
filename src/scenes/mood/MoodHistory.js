import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';

import { getMonthlyMoods, countMoods } from '../../utils/HistoryUtils';


const backendUrl = process.env.REACT_APP_BACKEND_URL;
const serverBaseUrl = `${backendUrl}`;

const MoodHistory = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { userId, password, username, email, token } = location.state;

    const date = new Date();

    const handleForSubmit = async (values, onSubmitProps) => {
        const {month, year} = values;

        const records = getMonthlyMoods(month, year);
        const count = countMoods(records);

        onSubmitProps.setSubmitting(true);

        return count;
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
                {({isSubmitting}) => (
                    <Form className='mood-date-form'>
                        <label htmlFor='month'>Month</label>
                        <br />
                        <Field name="month" />
                        <br />

                        <label htmlFor='year'>Year</label>
                        <br />
                        <Field name="year" />
                        <br />

                        <button className="year" type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
            {isSubmitting || values.count ? (
                <div className='display-moods'>

                </div>
                ) : null}
        </div>
    )
}

export default MoodHistory;
