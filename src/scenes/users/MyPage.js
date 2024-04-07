import React from 'react';
import { useNavigate, useLocation, useState } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

import logo from '../../assets/coordinate_s.png';

import '../../App.css';
const userApiEndpoint = `/api/user`;

const MyPage = async () => {

    const location = useLocation();
    const user = location.state.user;

    const updatePassword = async (password, newPassword) => {
        // update password => dynamic rendering to update password
        try {
            const response = await axios.put(`${userApiEndpoint}/update-password`, {
                newPassword: newPassword,
                password: password,
                header: {
                    username: user.username
                }
            })

            if (response.status != 201) {
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
                    username: user.username
                }
            })

            if (response.status == 404) {
                alert("Please check your current email address again");
            } else if (response.status == 201) {
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
                username: user.username,
                password: password
            })

            if (response.status == 401) {
                throw Error("Your username or password is invalid. Please check your information again");
            } else if (response.status == 201) {
                alert(`Successfully deactivated user ${username}`);
            } else {
                throw Error(response.data);
            }
        } catch(error) {
            alert(`Failed to deactivate your account: ${error.message}`);
        }
    }

    return (
        <div className='my-page'>
            <header className='mood-input-header'>
                <h1 className='title'>
                    Add Your Current Mood!
                </h1>
            </header>
            <div className=''>
            </div>
        </div>
    )
}

export default MyPage;