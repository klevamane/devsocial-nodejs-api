// node modules
import passport from 'passport';
import mongoose from 'mongoose';

// models
import Profile from '../models/profile';
import User from '../models/user';

// validators
import validateProfile from '../validators/profile';
import validateXperience from '../validators/experience';
import validateEducation from '../validators/education';

class ProfileController {

    
    /**
     * @description get the current user profile
     * @param  {} req
     * @param  {} res
     * @access private
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
     * @description get the user profile by id passed
     * @param  {} req
     * @param  {} res
     * @access public
     */
    static getPublic(req, res) {
        let errors = {};
        errors.profile = 'There is no profile for this user';
        
        Profile.findOne({ user: req.params.id })
            .populate('user', ['name', 'avatar']) // because the profile model references the user model, we can populate desired fields
            .then(profile => {
                if(!profile) {
                    
                    return res.status(404).json(errors)
                }
                return res.status(200).json(profile);
            })
            .catch(err => res.status(404).json(errors));
    }


    /**
     * @description get all profiles
     * @param  {} req
     * @param  {} res
     * @access public
     */

     static getAll(req, res) {
        let errors = { profile: 'No profiles' };
        Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if(!profiles)
                return res.status(404).json(errors);
            return res.status(200).json(profiles);
        })
        .catch(err => res.status(404).json(errors));
     }

    /**
     * @description get the profile by handle
     * @param  {} req
     * @param  {} res
     * @access public
     */
    static getByHandle(req, res) {
        let errors = {};
        errors.handle = `There is no profile with the handle ${req.params.handle}`;
        Profile.findOne({ handle: req.params.handle })
        .populate('user', ['firstname','lastname', 'avatar'])
        .then(profile => {
            if(!profile) {
                
                return res.status(404).json(errors);
            }
            
            return res.status(200).json(profile);
        })
        .catch(err => res.status(404).json(errors));
    }

    /**
     * @description Create the current user profile
     * @param  {} req
     * @param  {} res
     * @access Private
     */
    static  postOrUpdate(req, res) {
        const profileFields = {};
        let { errors, isValid } = validateProfile(req.body);
        if (!isValid)
            return res.status(400).json(errors);

        // req.user is gotten from the token via passport
        profileFields.user = req.user.id; 

        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.company) profileFields.company  = req.body.company;
        if(req.body.website) profileFields.website = req.body.website;
        if(req.body.status) profileFields.status = req.body.status;
        if(req.body.bio) profileFields.bio = req.body.bio;
        if(req.body.location) profileFields.location = req.body.location;
        if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

        // Skills - The skills which is a comma seperated value from input
        // is split into an array
        if (typeof req.body.skill !== 'undefine') {
            profileFields.skills = req.body.skills.split(',');
        }

        // Social
        // Note that social is an object of fields
        // therefore we need to initalize profileFields.social as an empty object

        profileFields.social = {}

        if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if(req.body.facebook) profileFields.social.facebook= req.body.facebook;
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
     
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
    // Experience

    static addExperience (req, res) {
        let { errors, isValid } = validateXperience(req.body);
        if (!isValid)
            return res.status(400).json(errors);
        

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const newXperience = {
                    title: req.body.title,
                    location: req.body.location,
                    company: req.body.company,
                    description: req.body.description,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,  
                } 
                // this will add the experience to the to of the array as opposed to
                // pushing at the end
                profile.experience.unshift(newXperience);
                profile.save()
                    .then(profile => res.json(profile));
            })

    }

    static addEducation (req, res) {
        let { errors, isValid } = validateEducation(req.body);
        if (!isValid)
            return res.status(400).json(errors);
        
        let fromDate = new Date(req.body.from);

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const newEducation = {
                    school: req.body.school,
                    degree: req.body.degree,
                    fieldofstudy: req.body.fieldofstudy,
                    description: req.body.description,
                    from: fromDate,
                    to: req.body.to,
                    current: req.body.current,  
                } 
                // this will add the experience to the to of the array as opposed to
                // pushing at the end
                profile.education.unshift(newEducation);
                profile.save()
                    .then(profile => res.json(profile));
            })

    }

    static deleteExperience(req, res) {
        Profile.findOne({ user: req.user.id})
            .then(profile => {
                const indexToBeRemoved = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);

                console.log('******** the index ', indexToBeRemoved);
                
                // Splice out of the array
                if (indexToBeRemoved === -1) {
                    return res.status(404).json({ experience: 'The experience to be deleted does not exist'});
                }
                profile.experience.splice(indexToBeRemoved, 1);

                // Save
                profile.save().then(profile => res.status(200).json(profile));
            })
            .catch(err => res.status(404).json(err));
    }

    static deleteEducation(req, res) {
        Profile.findOne({ user: req.user.id})
            .then(profile => {
                const indexToBeRemoved = profile.education
                    .map(item => item.id)  // get the id of each item and make another array
                    .indexOf(req.params.edu_id); // in the new array get the index where req.params.edu_id === id
                
                    if (indexToBeRemoved === -1) {
                        return res.status(404).json({ experience: 'The education to be deleted does not exist'});
                    }
                // Splice out of the array
                profile.education.splice(indexToBeRemoved, 1);

                // Save
                profile.save().then(profile => res.status(200).json(profile));
            })
            .catch(err => res.status(404).json(err));
    }

    static deleteProfileAndUser(req, res) {
        Profile.findOneAndDelete({user: req.user.id})
            .then(() => {
                User.findOneAndDelete({ _id: req.user.id})
                .then(() => res.status(200).json({ success: true }))
            })
            .catch(err => res.status(400).json({ success: false }));
    }
    
}


export default ProfileController;
