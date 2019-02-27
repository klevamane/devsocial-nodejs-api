import User from '../models/user';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';


class UserController {
    
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
}

export default UserController;
