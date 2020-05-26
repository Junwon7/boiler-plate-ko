import axios from  'axios';

import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
} from './types' ;



export function loginUser(dataToSubmit){

    const request = axios.post('/api/users/login', dataToSubmit)
        .then(resposen => resposen.data)

    return {
        type: LOGIN_USER,
        payload : request
    }
}

export function registerUser(dataToSubmit){

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(resposen => resposen.data)

    return {
        type: REGISTER_USER,
        payload : request
    }
}



export function auth(){  // body 필요 없음(dataToSubmit)

    const request = axios.get('/api/users/auth')
        .then(resposen => resposen.data)

    return {
        type: AUTH_USER,
        payload : request
    }
}