// TODO: Organize directory of the js files
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import '../../App.css';

// const backendPort = process.env.BACKEND_PORT;
const userApiEndpoint = `/api/user`;

const SignIn = () => {

    const navigate = useNavigate();

    // const { userName, password } = req.body;
    const signIn = async (username, password) => {
        console.log(`Calling signIn function for ${username}`);
        try {
            const response = await axios.get(`${userApiEndpoint}/signin`, {
                params: {
                    userName: username,
                    password: password
                }
            });

            console.log(`response status: ${response.status}`);

            if (response.status !== 201) {
                throw new Error(`Sign in failed: ${response.data}`);
            } else {
                alert(`Welcome ${username}!`);
                navigate("/Dashboard");
            }
        } catch(error) {
            alert(`Sign in failed: ${error.message}`);
        }
    }

    const handleForSubmit = async (values, onSubmitProps) => {
        console.log(values.userName);
        console.log(values.password);
        const {userName, password} = values;

        if (!userName) {
            alert("Please enter your user name");
            return;
        }

        if (!password) {
            alert("Please enter your password");
            return;
        }

        onSubmitProps.setSubmitting(true);
    
        await signIn(userName, password);
    }


    return (
        <div className='sign-up'>
            <header className='sign-up-header'>
                <h1 className='title'>
                    Sign In
                </h1>
            </header>
            <Formik
                onSubmit={handleForSubmit}>
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

                        <button className="submit" type="submit" disabled={isSubmitting}>Sign In</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignIn;