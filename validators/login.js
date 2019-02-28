import Validator from 'validator';
import isEmpty_ from './isEmpty';

// get the data
const validatateLogin = (data) => {
    let errors = {}

    data.email = isEmpty_(data.email) === true ?  '' : data.email;
    data.password = isEmpty_(data.password) === true ?  '' : data.password;

     // Email

     if(!Validator.isEmail(data.email))
        errors.email = 'Email is invalid';

    if (Validator.isEmpty(data.email)) 
        errors.email = 'Email field is required';
    
    // password

    if (Validator.isEmpty(data.password))
        errors.password = 'Password field is required';

    
    return {
        errors,
        isValid: isEmpty_(errors)
    }

}

export default validatateLogin;
