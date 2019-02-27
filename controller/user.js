import User from '../models/user';

class UserController {

    static registerUser = (req, res) => {
        User.findOne(email = req.body.email)
            .then(user => {
                if(user) {
                    return res.status(400).json({ email: 'A user with the same email address already exists'})
                }
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar,

                })

            })
    }
}
