import User from '../models/user';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {secretKey} from '../config/keys';


class UserController {
    
    /**
     * @param  {object} req
     * @param  {object} res
     */
    static registerUser (req, res) {
        User.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    return res.status(400).json({ email: 'A user with the same email address already exists'});
                }
                // check gravatar libraries for the docs
                let avatar = gravatar.url(req.body.email, {s: 200, r: 'pg', d: 'mm'});
            
                // bcrypt
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
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
        // check if user email exist
       let { email, password } = req.body;
       let loggedInuser = ''
       User.findOne({ email })
       .then(user => {
           if (!user)
            return res.status(404).json({ email: 'The email address does not exist '})
            loggedInuser = user;
            bcryptjs.compare(password ,user.password)
            .then(userExists => {
                if(userExists) {
                    
                    let payload = {
                        id: loggedInuser.id,
                        email: loggedInuser.email,
                        avatar: loggedInuser.avatar
                    };
                   let signedToken =  jwt.sign({ data: payload}, secretKey, { expiresIn: '1h' })
                    return res.status(200).json({success: 'Success', token: 'Bearer ' + signedToken })
                }
                return res.status(400).json({ password: 'The password is wrong'})
            })
            .catch(err => res.status(400).json({ password: 'Invalid email and password combination'}));
       });

    }


    static currentUser (req, res) {
        // req.user is added by passport
        let userDetailsTobeSent = {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name
        }
        res.status(200).json(userDetailsTobeSent);
    }   
}

export default UserController;
