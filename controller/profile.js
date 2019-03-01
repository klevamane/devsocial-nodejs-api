// node modules
import passport from 'passport';
import mongoose from 'mongoose';

// models
import Profile from '../models/profile';
import User from '../models/user';

// validators
import validateProfile from '../validators/profile';

class ProfileController {

    
    /**
     * @description get the current user profile
     * @param  {} req
     * @param  {} res
     */
    static get(req, res) {
        let errors = {};
        // req.user is gotten from the token via passport
        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']) // because the profile model references the user model, we can populate desired fields
            .then(profile => {
                if(!profile) {
                    errors.profile = 'There is no profile for this user';
                    return res.status(404).json(errors)
                }
                return res.status(200).json(profile);
            })
            .catch(err => res.status(404).json(err));
    }

    /**
     * @description Create the current user profile
     * @param  {} req
     * @param  {} res
     * @access Private
     */
    static postOrUpdate(req, res) {
        const profileFields = {};
        let { errors, isValid } = validateProfile(req.body);
        if (!isValid)
            return res.status(400).json(errors);

        // req.user is gotten from the token via passport
        profileFields.user = req.user.id 

        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.company) profileFields.company  = req.body.company;
        if(req.body.website) profileFields.hwebsite = req.body.website;
        if(req.body.status) profileFields.status = req.body.status;
        if(req.body.bio) profileFields.bio = req.body.bio;
        if(req.body.location) profileFields.location = req.body.location;
        if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

        // Skills - The skills which is a comma seperated value from input
        // is split into an array
        if (typeof req.body.skill !== 'undefine') {
            profileFields.skills = req.body.skills.split(',');
        }

        // Soical
        // Note that social is an object of fields
        // therefore we need to initalize profileFields.social as an empty object

        profileFields.social = {}

        if(req.body.youtube) profileFields.youtube = req.body.youtube;
        if(req.body.linkedin) profileFields.linkedin = req.body.linkedin;
        if(req.body.facebook) profileFields.facebook= req.body.facebook;
        if(req.body.instagram) profileFields.instagram = req.body.instagram;
        if(req.body.twitter) profileFields.twitter = req.body.twitter;
     
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if(profile) {
                    // Update the profile if a profile exist
                    // create a new profile if no exist
                    Profile.findOneAndUpdate({ user: req.user.id} , { $set: profileFields}, {new: true })
                        .then(profile => res.status(200).json(profile))
                }
                else {
                    // check if the handle to be entered already exists
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if (profile) {
                                errors.handle = 'That handle is being used by another developer';
                            return res.status(400).json(errors);
                            }
                            // save profile
                            new Profile(profileFields).save()
                                .then(profile => res.status(200).json(profile))
                            
                        });

                }
                

            })
        
        
        
    }
}

export default ProfileController;
