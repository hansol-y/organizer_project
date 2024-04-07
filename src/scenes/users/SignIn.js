import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import '../../App.css';

// const backendPort = process.env.BACKEND_PORT;
const userApiEndpoint = `/api/user`;

const SignIn = () => {

    const history = useHistory();
    const [user, setUser] = useState(null);

    // const { username, password } = req.body;
    const signIn = async (username, password) => {
        console.log(`Calling signIn function for ${username}`);
        try {
            const response = await axios.post(`${userApiEndpoint}/signin`, {
                username: username,
                password: password
            });

            console.log(`response status: ${response.status}`);

            if (response.status !== 201) {
                throw new Error(`Sign in failed: ${response.data}`);
            } else {
                console.log(response.data.user);
                setUser(response.data.user);
                alert(`Welcome ${username}!`);
                history.push({
                    pathname: "/Dashboard",
                    state: { user }
                });
            }
        } catch(error) {
            alert(`Sign in failed: ${error.message}`);
        }
    }

    const handleForSubmit = async (values, onSubmitProps) => {
        console.log(values.username);
        console.log(values.password);
        const {username, password} = values;

        if (!username) {
            alert("Please enter your user name");
            return;
        }

        if (!password) {
            alert("Please enter your password");
            return;
        }

        onSubmitProps.setSubmitting(true);
    
        await signIn(username, password);
    }


    return (
        <div className='sign-up'>
            <header className='sign-up-header'>
                <h1 className='title'>
                    Sign In
                </h1>
            </header>
            <Formik initialValues={{
                userName: "",
                password: ""
            }}
                onSubmit={handleForSubmit}>
                {({isSubmitting}) => (
                    <Form className='sign-up-form'>
                        <label htmlFor='username'>User Name</label>
                        <br />
                        <Field name="username" />
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