import {config} from 'dotenv';
config();

export default {
	algorithms: ['HS256'],
	secret: process.env.JWT_SCRET, // TODO Put in process.env
};