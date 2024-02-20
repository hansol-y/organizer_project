// TODO: Organize directory of the js files
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';

const backendPort = process.env.BACKEND_PORT;
const serverBaseUrl = `http://localhost:${backendPort}`
const userApiEndpoint = `${serverBaseUrl}/api/user`

// const { userName, password } = req.headers;
async function signIn(username, password) {
    try {
        const response = await fetch(`${userApiEndpoint}/signin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userName': username,
                'password': password
            }
        });

        if (response.status !== 201) {
            const error = await response.json();
            throw new Error(`Sign in failed: ${error}`);
        } else {
            const successContainer = document.getElementById('success-container');
            successContainer.innerHTML = `<p>Success: ${await response.json().then((result) => result.message)}</p>`;
        }
    } catch(err) {

    }
}

const SignIn = () => {
    return (
        // TODO: rendering
        <Router>
            <div className='sign-in'>
                <header className='sign-in-header'>
                    <p className='sign-in-title'>
                        Sign In
                    </p>
                </header>
            </div>

        </Router>
    );

}

export default SignIn;