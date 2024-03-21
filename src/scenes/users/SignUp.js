// TODO: Organize directory of the js files

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';

import '../../App.css';

// const backendPort = process.env.BACKEND_PORT;
const userApiEndpoint = `/api/user`
const whitelist = ['http://localhost:3000']

const SignUp = () => {
    const navigate = useNavigate();

    // { userName, password, email } = req.body
    const signUp = async (username, password, email) => {
        console.log("Start calling signUp function");
        console.log(username, password, email);
        try {
            console.log("Sending POST request for user registration");
            console.log(`${userApiEndpoint}/signup`);
            const origins = whitelist.join(", ");
            const response = await axios.post(`${userApiEndpoint}/signup`, 
            {
                userName: username,
                password: password,
                email: email
            }, 
            {
                headers: {
                    "Content-Type": 'application/json',
                    'Access-Control-Allow-Origin': origins,
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            });

            console.log(`Got response: ${response}. Cheking it's status now.`);

            if (response.status !== 201) {
                throw new Error(`Sign-up failed: ${response.data}`);
            } else {
                alert(`Successfully registered User ${username}`);
                navigate("/SignIn");
            }
        } catch (error) {
            console.error('Error during sign-up\n', error.message);
            alert(`Failed registering ${username}.`);
        }
    }

    const handleForSubmit = async (values, onSubmitProps) => {
        const {userName, password, email} = values;
    
        if (!userName) {
            alert("The given user name is invalid");
            return;
        }
        if (!password || password.length < 8) {
            alert("The given password is invalid");
            return;
        }
    
        if (!email) {
            alert("The given email is invalid");
            return;
        }
    
        onSubmitProps.setSubmitting(true);
    
        await signUp(userName, password, email);
        onSubmitProps.resetForm();
    }
    
    return (
        <div className='sign-up'>
            <h1 className='title'>Sign Up</h1>
            <img src={logo} className="mid-logo" alt="logo" />
            <Formik
                initialValues={{
                    userName: '',
                    password: '',
                    email: ''
                }} onSubmit={handleForSubmit}>
                {({isSubmitting}) => (
                    <Form className='sign-up-form'>
                        <label htmlFor='userName'>User Name</label>
                        <br />
                        <Field name="userName" />
                        <br />

                        <label htmlFor='password'>Password</label>
                        <br />
                        <Field name="password" />
                        <br />

                        <label htmlFor='email'>Email</label>
                        <br />
                        <Field name="email" />
                        <br />

                        <button className="submit" type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignUp;
