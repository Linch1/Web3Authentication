import {config} from 'dotenv';
import axios from 'axios';
config(); // intialize dotenv config

const API_USERS = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/users'
});

async function getNonce(  publicAddress ){
    return await API_USERS.get('/nonce', { params: { publicAddress } });
}
async function getUser(){
    return await API_USERS.get('/', {withCredentials: true});
}

let ApiUsers = {
    getNonce,
    getUser
};

export default ApiUsers;