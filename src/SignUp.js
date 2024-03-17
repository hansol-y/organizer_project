// TODO: Organize directory of the js files
import React, {useState} from 'react';
import logo from './assets/coordinate_s.png';

const axios = require('axios');

const backendPort = process.env.BACKEND_PORT;
const serverBaseUrl = `http://localhost:${backendPort}`
const userApiEndpoint = `${serverBaseUrl}/api/user`

// { userName, password, email } = req.body
async function signUp(username, password, email) {
    try {
        const response = await axios.post(`${userApiEndpoint}/signup`, 
        {
            userName: username,
            password: password,
            email: email
        }, 
        {
            headers: {
                "Content-Type": 'application/json'
            }
        });

        if (response.status !== 201) {
            throw new Error(`Sign-up failed: ${response.data}`);
        } else {
            const successContainer = document.getElementById('success-container');
            successContainer.innerHTML = `<p>Success: ${response.data.message}</p>`;
        }
    } catch (error) {
        console.error('Error during sign-up\n', error.message);
        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    return (
        <div className='sign-up'>
            <header className='sign-up-header'>
                <img src={logo} className="sign-up-logo" alt="Mind Vector Logo" />
                <p className='sign-up-title'>
                    Sign Up
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
                <label>
                    Email
                    <br />
                    <input value={email} onChange={e => setEmail(e.target.value)} type='text' name='email' />
                </label>
                <button onClick={() => signUp(userName, password, email)}>Register</button>
            </form>
        </div>
    );
}

export default SignUp;
