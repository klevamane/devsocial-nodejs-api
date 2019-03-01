import express from 'express';
import passport from 'passport';
import ProfileController from '../../controller/profile';

const router = express.Router()

router.get('', passport.authenticate('jwt', { session: false }), ProfileController.get);
router.post('', passport.authenticate('jwt', { session: false }), ProfileController.postOrUpdate);

export default router;
