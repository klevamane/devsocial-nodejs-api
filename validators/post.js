import Validator from 'validator';
import isEmpty_ from './isEmpty';

// get the data
const validatePost = (data) => {
    let errors = {}

    data.text = isEmpty_(data.text) === true ?  '' : data.text;
    
    if(!Validator.isLength(data.text, {min: 10, max: 350 }))
        errors.text = 'The text must be between 10 - 350 characters including spaces';

    if (Validator.isEmpty(data.text)) 
        errors.text = 'Text field is required';
    
    return {
        errors,
        isValid: isEmpty_(errors)
    }

}

export default validatePost;
