import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    },
});

let User = mongoose.model('users', userSchema)
// module.exports = User = mongoose.model('users', userSchema);
export default User;
