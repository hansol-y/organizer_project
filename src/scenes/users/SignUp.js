// TODO: Organize directory of the js files

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';

import '../../App.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const userApiEndpoint = `${backendUrl}/api/user`

const SignUp = () => {
    const navigate = useNavigate();

    // { username, password, email } = req.body
    const signUp = async (userId, username, password, email) => {
        console.log("Start calling signUp function");
        console.log(username, password, email);
        try {
            console.log("Sending POST request for user registration");
            const response = await axios.post(`${userApiEndpoint}/signup`, 
            {
                userId: userId,
                username: username,
                password: password,
                email: email
            }, 
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            console.log(`Got response: ${response}. Cheking it's status now.`);

            if (response.status !== 201) {
                throw new Error(`Sign-up failed: ${response.data}`);
            } else {
                alert(`Successfully registered User ${userId}`);
                navigate("/SignIn");
            }
        } catch (error) {
            console.error('Error during sign-up\n', error.message);
            alert(`Failed registering ${userId}.`);
        }
    }

    const handleForSubmit = async (values, onSubmitProps) => {
        const {userId, username, password, email} = values;

        if (!userId) {
            alert("The given user ID is invalid");
            return;
        }
    
        if (!username) {
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
    
        await signUp(userId, username, password, email);
        onSubmitProps.resetForm();
    }
    
    return (
        <div className='sign-up'>
            <h1 className='title'>Sign Up</h1>
            <img src={logo} className="mid-logo" alt="logo" />
            <Formik
                initialValues={{
                    userId: '',
                    userName: '',
                    password: '',
                    email: ''
                }} onSubmit={handleForSubmit}>
                {({isSubmitting}) => (
                    <Form className='sign-up-form'>
                        <label htmlFor='userId'>User ID</label>
                        <br />
                        <Field name="userId" />
                        <br />

                        <label htmlFor='username'>User Name</label>
                        <br />
                        <Field name="username" />
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
