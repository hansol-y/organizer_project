// TODO: Organize directory of the js files
import React, {useState} from 'react';

import './App.css';

const axios = require('axios');

const backendPort = process.env.BACKEND_PORT;
const serverBaseUrl = `http://localhost:${backendPort}`
const userApiEndpoint = `${serverBaseUrl}/api/user`

// const { userName, password } = req.headers;
async function signIn(username, password) {
    try {
        const response = await axios.post(`${userApiEndpoint}/signin`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'userName': username,
                'password': password
            }
        });

        if (response.status !== 201) {
            throw new Error(`Sign in failed: ${response.data}`);
        } else {
            const successContainer = document.getElementById('success-container');
            successContainer.innerHTML = `<p>Success: ${await response.json().then((result) => result.message)}</p>`;
        }
    } catch(err) {

    }
}

const SignIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    return (
        // TODO: rendering
        <div className='sign-in'>
            <header className='sign-in-header'>
                <p className='sign-up-title'>
                    Sign In
                </p>
            </header>
            <form>
                <label>
                    User Name
                    <br />
                    <input value={userName} onChange={e => setUserName(e.target.value)} type='text' name='User Name'/>
                    <br />
                </label>
                <label>
                    Password
                    <br />
                    <input value={password} onChange={e => setPassword(e.target.value)} type='password' name='password' />
                    <br />
                </label>
                <button onClick={() => signIn(userName, password)}>Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;