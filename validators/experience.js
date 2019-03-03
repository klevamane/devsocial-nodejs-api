import Validator from 'validator';
import isEmpty_ from './isEmpty';

// get the data
const validatateXperience = (data) => {
    let errors = {}

    data.title = isEmpty_(data.title) === true ?  '' : data.title;
    data.company = isEmpty_(data.company) === true ?  '' : data.company;
    data.from = isEmpty_(data.from) === true ? '' : data.from;

    

    if (Validator.isEmpty(data.title)) 
        errors.title = 'Title field is required';
    
    if (Validator.isEmpty(data.company)) 
        errors.company = 'Company field is required';
    
    if (Validator.isEmpty(data.from)) 
        errors.from = 'From date field is required';
    
    return {
        errors,
        isValid: isEmpty_(errors)
    }

}

export default validatateXperience;
