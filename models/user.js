import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
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
    // avatar: {
    //     type: String
    // },
});

let User = mongoose.model('user', userSchema)
// module.exports = User = mongoose.model('users', userSchema);
export default User;
