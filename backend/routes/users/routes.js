import express from 'express';

import authorization from '../../middleware/auth.js';
import * as controller from './controller.js';

let userRouter = express.Router();

/** GET /api/users */
/** Authenticated route */
userRouter.route('/').get(
    authorization,
    controller.getSingle
);

/** GET /api/users/nonce */
userRouter.route('/nonce').get(controller.find);

/** GET /api/users/:userId */
/** Authenticated route */
userRouter.route('/:userId').get(
    authorization, 
    controller.get
);

/** POST /api/users */
userRouter.route('/').post(
    controller.create
);

/** PATCH /api/users/:userId */
/** Authenticated route */
userRouter.route('/:userId').patch(
    authorization, 
    controller.patch
);

export default userRouter;