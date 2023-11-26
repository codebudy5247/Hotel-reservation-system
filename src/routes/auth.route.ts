import express from 'express';
import {
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
} from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';

const router = express.Router();

/**
   * @openapi
   * '/api/auth/register':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      201:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Email already exist
   *      400:
   *        description: Bad request
   */
router.post('/register', validate(createUserSchema), registerHandler);


/**
   * @openapi
   * '/api/auth/login':
   *  post:
   *     tags:
   *     - User
   *     summary: Login a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/LoginUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/LoginUserResponse'
   *      401:
   *        description: Invalid email or password
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

router.post('/login', validate(loginUserSchema), loginHandler);

router.get('/refresh', refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);


/**
   * @openapi
   * '/api/auth/logout':
   *  post:
   *     tags:
   *     - User
   *     summary: Logout a user
   *     responses:
   *      200:
   *        description: Success
   *      404:
   *        description: Not Found
   *      403:
   *        description: Forbidden
   */
router.get('/logout', logoutHandler);

export default router;
