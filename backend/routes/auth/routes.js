import express from 'express';
import * as controller from './controller.js';
let authRouter = express.Router();

/** POST /api/auth */
authRouter.route('/').post(controller.create);
authRouter.route('/logout').post(controller.logout);
export default authRouter;