import {config} from 'dotenv';
import jwt from 'jsonwebtoken';
config(); // intialize dotenv config

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SCRET);
        req.authenticated = { ...data.payload }
        return next();
    } catch {
      return res.sendStatus(403);
    }
};
export default authorization;