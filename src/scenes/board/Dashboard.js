import React, {useState} from 'react';
import {Formik} from 'formik';

const axios = require('axios');

const backendPort = process.env.BACKEND_PORT;
const serverBaseUrl = `http://localhost:${backendPort}`;
const userApiEndpoint = `${serverBaseUrl}/api/user`;
const moodApiEndpoint = `${serverBaseUrl}/api/mood`;

const createMoodRec = (userId) => {
    let req = userId;
    return req;
}

const dashboard = async () => {

}

export default dashboard;