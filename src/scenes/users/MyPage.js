import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';

import './Users.css';
const userApiEndpoint = `/api/user`;

const MyPage = async () => {

    const location = useLocation();
    const { userId, password, username, email } = location.state;
    const [isBISectionOpened, setIsBISecctionOpened] = useState(false);

    if (!userId || !password || !username || !email) {
        alert("Your user information is invalid. Please try again.");
        return;
    }

    const openBISection = () => {
        setIsBISecctionOpened(true);
    }

    const closeBISection = () => {
        setIsBISecctionOpened(false);
    }

    const updatePassword = async (password, newPassword) => {
        // update password => dynamic rendering to update password
        try {
            const response = await axios.put(`${userApiEndpoint}/update-password`, {
                newPassword: newPassword,
                password: password,
                header: {
                    username: username
                }
            })

            if (response.status !== 201) {
                alert("Successfully updated the password");
            } else {
                throw Error(response.data);
            }
        } catch(error) {
            alert(`Failed to update password: ${error.message}`);
        }
    }

    const updateEmail = async (currentEmail, newEmail) => {
        try {
            const response = await axios.put(`${userApiEndpoint}/update-email`, {
                currentEmail: currentEmail,
                newEmail: newEmail,
                headers: {
                    username: username
                }
            })

            if (response.status === 404) {
                alert("Please check your current email address again");
            } else if (response.status === 201) {
                alert("Successfully updated your email address");
            } else {
                throw Error(response.data);
            }
            
        } catch(error) {
            alert(`Failed to update email address: ${error.message}`);
        }
    }

    const deactivateAccount = async (password) => {
        // const { username, password } = req.body;
        try {
            const response = await axios.delete(`${userApiEndpoint}`, {
                username: username,
                password: password
            })

            if (response.status === 401) {
                throw Error("Your username or password is invalid. Please check your information again");
            } else if (response.status === 201) {
                alert(`Successfully deactivated user ${username}`);
            } else {
                throw Error(response.data);
            }
        } catch(error) {
            alert(`Failed to deactivate your account: ${error.message}`);
        }
    }

    const handlePasswordUpdateSubmit = async (values, onSubmitProps) => {
        const {password, newPassword} = values;
        try {
            await updatePassword(password, newPassword);
        } catch(error) {
            alert(`Failed to update password: ${error.message}. Please try again`);
        }
    }

    return (
        <div className='my-page'>
            <header className='my-page-title'>
                <h1 className='title'>
                    My Account
                </h1>
                <hr className='basic-hr' />
            </header>
            <body>
                <div className='section'>
                    <h2 className='subtitle'>
                        Basic Information
                    </h2>
                    <div className='three-section'>
                        User Name<br />
                        My User Name: {username}
                    </div>
                    <div className='three-section'>
                        Password<br />
                        <button className='link-button' onClick={openBISection}>
                            Update Password
                        </button>
                        {({isBISectionOpened}) => (
                            <Form className='account-update-section'>
                                <h2>
                                    Update Password
                                </h2>
                                <br />
                                <label htmlFor='password'>Current Password</label>
                                <br />
                                <Field name="password" />
                                <br />
                                <label htmlFor='newPassword'>New Password</label>
                                <br />
                                <Field name="newPassword" />
                                <br />

                                <button className="submit" type="submit" >Update Password</button>
                            </Form>
                        )}
                        
                    </div>
                </div>
            </body>
        </div>
    )
}

export default MyPage;