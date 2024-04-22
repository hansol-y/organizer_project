import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';

import './Users.css';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const userApiEndpoint = `${backendUrl}/api/user`;

const MyPage = () => {

    const location = useLocation();
    const { userId, password, username, email } = location.state;
    const [isPasswordSectionOpened, setIsPasswordSecctionOpened] = useState(false);
    const [isEmailSectionOpened, setIsEmailSectionOpened] = useState(false);
    const [isUsernameSectionOpened, setIsUsernameSectionOpened] = useState(false);

    if (!userId || !password || !username || !email) {
        alert("Your user information is invalid. Please try again.");
        return;
    }

    const changePasswordSection = () => {
        if (isPasswordSectionOpened) {
            setIsPasswordSecctionOpened(false);
        } else {
            setIsPasswordSecctionOpened(true);
        }
    }

    const changeEmailSection = () => {
        if (isEmailSectionOpened) {
            setIsEmailSectionOpened(false);
        } else {
            setIsEmailSectionOpened(true);
        }
    }

    const changeUsernameSection = () => {
        if (isUsernameSectionOpened) {
            setIsUsernameSectionOpened(false);
        } else {
            setIsUsernameSectionOpened(true);
        }
    }


    const updatePassword = async (currentPassword, newPassword) => {
        console.log("Updating Password");
        // update password => dynamic rendering to update password
        console.log(`newPassword: ${newPassword}`);
        console.log(`currentPassword: ${currentPassword}`);
        try {
            const response = await axios.put(`${userApiEndpoint}/update-password`, {
                newPassword: newPassword,
                password: currentPassword
            }, {
                headers: {
                    userid: userId
                }
            })

            if (response.status === 201) {
                alert("Successfully updated the password");
            } else {
                throw Error(response.data);
            }
        } catch(error) {
            alert(`Failed to update password: ${error.data}`);
        }
    }

    const updateEmail = async (currentEmail, newEmail) => {
        try {
            const response = await axios.put(`${userApiEndpoint}/update-email`, {
                currentEmail: currentEmail,
                newEmail: newEmail
            }, {
                headers: {
                    userid: userId
                }
            })

            if (response.status === 404) {
                alert("Please check your current email address again");
            } else if (response.status === 201) {
                alert("Successfully updated your email address");
            } else {
                throw Error(response.message);
            }
            
        } catch(error) {
            alert(`Failed to update email address: ${error.message}`);
        }
    }

    const updateUsername = async (newUsername) => {
        try {
            const response = await axios.put(`${userApiEndpoint}/update-username`, newUsername, {
                headers: {
                    userid: userId
                }
            });

            if (response.status === 409) {
                alert("The given user name already exists. Please try another one");
            } else if (response.status === 201) {
                alert("Successfully updated your user name");
            } else {
                throw Error(response.message);
            }

        } catch(error) {
            alert(`Failed to update user name: ${error.message}`);
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

    const handlePasswordUpdateSubmit = async (values) => {
        const {currentPassword, newPassword} = values;
        try {
            await updatePassword(currentPassword, newPassword);
        } catch(error) {
            alert(`Failed to update password: ${error.message}. Please try again`);
        }
    }

    const handleEmailUpdateSubmit = async (values) => {
        const {currentEmail, newEmail} = values;
        try {
            await updateEmail(currentEmail, newEmail);
        } catch(error) {
            alert(`Failed to update email address: ${error}. Please try again`);
        }
    }

    const handleUNUpdateSubmit = async (values) => {
        const newUsername = values;
        try {
            await updateUsername(newUsername);
        } catch(error) {
            alert(`Failed to update email address: ${error}. Please try again`);
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
                <h2 className='subtitle'>
                    Basic Information
                </h2>
                <div className='section'>
                    
                    <div className='three-section'>
                        User Name<br />
                        <br />
                        My User Name: {username}
                        <br />
                        <button className='link-button' onClick={changeUsernameSection}>
                            Update User Name
                        </button>
                        {isUsernameSectionOpened && (
                            <Formik initialValues={{
                                newUsername: ""
                            }}
                                onSubmit={handleUNUpdateSubmit}>
                                {
                                    <Form className='sign-up-form'>
                
                                        <label htmlFor='newUsername'>New User Name</label>
                                        <br />
                                        <Field name="newUsername" />
                                        <br />
                
                                        <button className="submit" type="submit" >Update</button>
                                    </Form>
                                }
                            </Formik>
                        )}
                    </div>
                    <br />
                    <div className='three-section'>
                        Password<br />
                        <br />
                        <button className='link-button' onClick={changePasswordSection}>
                            Update Password
                        </button>
                        {isPasswordSectionOpened && (
                            <Formik initialValues={{
                                userId: "",
                                password: "",
                                newPassword: ""
                            }}
                                onSubmit={handlePasswordUpdateSubmit}>
                                {
                                    <Form className='sign-up-form'>
                                        <label htmlFor='userId'>User ID</label>
                                        <br />
                                        <Field name="userId" />
                                        <br />
                
                                        <label htmlFor='currentPassword'>Current Password</label>
                                        <br />
                                        <Field name="currentPassword" />
                                        <br />

                                        <label htmlFor='newPassword'>New Password</label>
                                        <br />
                                        <Field name="newPassword" />
                                        <br />
                
                                        <button className="submit" type="submit" >Update</button>
                                    </Form>
                                }
                            </Formik>
                        )}
                    </div>
                    <br />
                    <div className='three-section'>
                        Email: {email} <br />
                        <button className='link-button' onClick={changeEmailSection}>
                            Update Email
                        </button>
                        {isEmailSectionOpened && (
                            <Formik initialValues={{
                                newEmail: ""
                            }}
                                onSubmit={handleEmailUpdateSubmit}>
                                {
                                    <Form className='sign-up-form'>
                                        <label htmlFor='currentEmail'>Current Email Address</label>
                                        <br />
                                        <Field name="currentEmail" />
                                        <br />
                                        <br />
                                        <label htmlFor='newEmail'>New Email Address</label>
                                        <br />
                                        <Field name="newEmail" />
                                        <br />
                
                                        <button className="submit" type="submit" >Update</button>
                                    </Form>
                                }
                            </Formik>
                        )}
                    </div>
                </div>
            </body>
        </div>
    )
}

export default MyPage;