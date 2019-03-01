import express from 'express';
import passport from 'passport';
import ProfileController from '../../controller/profile';
import { request } from 'http';

const router = express.Router();

router.get('', passport.authenticate('jwt', { session: false }), ProfileController.get);
router.post('', passport.authenticate('jwt', { session: false }), ProfileController.postOrUpdate);
router.get('/handle/:handle', ProfileController.getByHandle);
router.get('/id/:id', ProfileController.getPublic);
router.get('/all', ProfileController.getAll);
router.post('/experience', passport.authenticate('jwt', { session: false }), ProfileController.addExperience);
router.post('/education', passport.authenticate('jwt', { session: false }), ProfileController.addEducation);


export default router;
