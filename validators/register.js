import Validator from 'validator';
import isEmpty_ from './isEmpty';

const validateRegisterInput = (data) => {
    let errors = {}
    // console.log('PPPPPPP -> name ', result);
    const result = isEmpty_(data.name);

    data.name = isEmpty_(data.name) === true ?  '' : data.name;
    data.email = isEmpty_(data.email) === true ?  '' : data.email;
    data.password = isEmpty_(data.password) === true ?  '' : data.password;
    data.confirmpwd = isEmpty_(data.confirmpwd) === true ?  '' : data.confirmpwd;
    
    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(!Validator.isAlpha(data.name))
        errors.name = 'Name field must only contain alphabets';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    // Email

    if(!Validator.isEmail(data.email))
        errors.email = 'Email is invalid';

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    // password

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 and 30 characters';
    }

    // confirm password
    if (!Validator.equals(data.confirmpwd, data.password)) {
        errors.confirmpwd = 'The password does not match';
    }

    if (Validator.isEmpty(data.confirmpwd)) {
        errors.confirmpwd = 'Confrim password field is required';
    }

   


    return {
        errors,
        isValid: isEmpty_(errors)
    }
}

export default validateRegisterInput;
