import express from 'express';
import  UserController from '../../controller/user';
import passport from 'passport';

let router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.login);

router.get('/current', passport.authenticate('jwt', { session: false }), UserController.currentUser)
export default router;
