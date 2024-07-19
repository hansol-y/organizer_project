import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

import './Users.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_OAUTH_PASSWORD = process.env.GOOGLE_OAUTH_PASSWORD;

const userApiEndpoint = `${backendUrl}/api/user`

const SignIn = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // const googleLogIn = useGoogleLogin({
    //     onSuccess: tokenResponse => console.log(tokenResponse)
    // });

    const signIn = async (userId, password) => {
        console.log(`Calling signIn function for ID ${userId}`);
        try {
            const response = await axios.post(`${userApiEndpoint}/signin`, {
                userId: userId,
                password: password
            });

            console.log(`response status: ${response.status}`);

            if (response.status !== 201) {
                throw new Error(`Sign in failed: ${response.data}`);
            } else {
                const userData = JSON.parse(response.data.user);
                const token = response.data.token;
                setUser(userData);
                navigate("/Dashboard", { state: { userId: userId, password: password, username: userData.username, email: userData.email, token: token }});
                alert(`Welcome ${userData.username}!`);
            }
        } catch(error) {
            alert(`Sign in failed: ${error.message}`);
        }
    }

    const handleForSubmit = async (values, onSubmitProps) => {
        const {userId, password} = values;

        if (!userId) {
            alert("Please enter your user name");
            return;
        }

        if (!password) {
            alert("Please enter your password");
            return;
        }

        onSubmitProps.setSubmitting(true);
    
        await signIn(userId, password);
    }

    return (
        <div className='sign-in'>
            <header className='sign-in-header'>
                <h1 className='title'>
                    Sign In
                </h1>
            </header>
            <Formik initialValues={{
                userId: "",
                password: ""
            }}
                onSubmit={handleForSubmit}>
                {({isSubmitting}) => (
                    <Form className='sign-up-form'>
                        <label htmlFor='userId'>User ID</label>
                        <br />
                        <Field name="userId" />
                        <br />

                        <label htmlFor='password'>Password</label>
                        <br />
                        <Field name="password" />
                        <br />

                        <button className="submit" type="submit" disabled={isSubmitting}>Sign In</button>

                        <GoogleOAuthProvider clientId={`${GOOGLE_OAUTH_CLIENT_ID}`}>
                            <button className="google-login-button" onClick={() => {

                            }}>
                                Sign in with Google
                            </button>
                        </GoogleOAuthProvider>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignIn;