import User from '../models/user';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {secretKey} from '../config/keys';

import validateRegisterInput from '../validators/register';
import validatateLogin from '../validators/login';
import Profile from '../models/profile';



class UserController {
    
    /**
     * @param  {object} req
     * @param  {object} res
     */
    static registerUser (req, res) {
       let { errors, isValid } = validateRegisterInput(req.body);
       console.log('checking if the variable is valid ===> ', isValid)
       if (!isValid)
        return res.status(400).json(errors);
       
        User.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    return res.status(400).json({ email: 'A user with the same email address already exists'});
                }
                // check gravatar libraries for the docs
                let avatar = gravatar.url(req.body.email, {s: 200, r: 'pg', d: 'mm'});
            
                // bcrypt
                let newUser = new User({
                    firstname: req.body.firstname.toLowerCase(),
                    lastname: req.body.lastname.toLowerCase(),
                    email: req.body.email.toLowerCase(),
                    password: req.body.password.toLowerCase(),
                    avatar,
                })
                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            })
    }

    static login (req, res) {

        // call validation function
        let {errors, isValid } = validatateLogin(req.body);
        if (!isValid)
            return res.status(400).json(errors);

        // check if user email exist        
       let { email, password } = req.body;
       let loggedInuser = ''
       User.findOne({ email })
       .then(user => {
           if (!user) {
            errors.email = 'The email address does not exist'
            return res.status(404).json(errors);
           }

            loggedInuser = user;
            bcryptjs.compare(password ,user.password)
            .then(userExists => {
                if(userExists) {
                    
                    let payload = {
                        id: loggedInuser.id,
                        email: loggedInuser.email,
                        avatar: loggedInuser.avatar,
                        firstname: loggedInuser.firstname,
                        lastname: loggedInuser.lastname
                    };
                   let signedToken =  jwt.sign({ data: payload}, secretKey, { expiresIn: '24h' })
                    return res.status(200).json({success: 'Success', token: signedToken })
                }
                errors.password = 'The password is wrong';
                return res.status(400).json(errors);
            })
            .catch(err => {
                errors.email = 'Invalid email and password combination';
                res.status(400).json(errors);
            });
       });

    }


    static currentUser (req, res) {
        // req.user is added by passport
        let userDetailsTobeSent = {
            id: req.user.id,
            email: req.user.email,
            firstname: req.user.firstname,
            lastname: req.user.lastname
        }
        res.status(200).json(userDetailsTobeSent);
    }
    
}

export default UserController;
