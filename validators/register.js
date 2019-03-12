import Validator from 'validator';
import isEmpty_ from './isEmpty';

const validateRegisterInput = (data) => {
    let errors = {}

    data.firstname = isEmpty_(data.firstname) === true ?  '' : data.firstname;
    data.lastname = isEmpty_(data.lastname) === true ?  '' : data.lastname;
    data.email = isEmpty_(data.email) === true ?  '' : data.email;
    data.password = isEmpty_(data.password) === true ?  '' : data.password;
    data.confirmpwd = isEmpty_(data.confirmpwd) === true ?  '' : data.confirmpwd;
    
    // Firstname
    if(!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
        errors.firstname = 'Firstname must be between 2 and 30 characters';
    }

    if(!Validator.isAlpha(data.firstname))
        errors.firstname = 'Firstname field must only contain alphabets';

    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = 'Firstname field is required';
    }


    // Lastname
    if(!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
        errors.lastname = 'Lastname must be between 2 and 30 characters';
    }

    if(!Validator.isAlpha(data.lastname))
        errors.lastname = 'Lastname field must only contain alphabets';

    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = 'Lastname field is required';
    }

    // Email

    if(!Validator.isEmail(data.email))
        errors.email = 'Email is invalid';

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    // password

    

    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 and 30 characters';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
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
