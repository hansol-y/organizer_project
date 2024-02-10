// TODO: Organize directory of the js files
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const backendPort = process.env.BACKEND_PORT;
const serverBaseUrl = `http://localhost:${backendPort}`
const userApiEndpoint = `${serverBaseUrl}/api/user`

// { userName, password, email } = req.body
async function signUp(username, password, email) {
    try {
        const response = await fetch(userApiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                password: password,
                email: email
            })
        });

        if (response.status !== 201) {
            const errorData = await response.json();
            throw new Error(`Sign-up failed: ${errorData}`);
        } else {
            const successContainer = document.getElementById('success-container');
            successContainer.innerHTML = `<p>Success: ${await response.json().then((result) => result.message)}</p>`;
        }
    } catch (error) {
        console.error('Error during sign-up\n', error.message);
        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }

    return (
        // TODO: rendering
        <Router>

        </Router>
    );
}

export default signUp;
