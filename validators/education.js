import Validator from 'validator';
import isEmpty_ from './isEmpty';

// get the data
const validatateEducation = (data) => {
    let errors = {}

    data.company = isEmpty_(data.company) === true ?  '' : data.company;
    data.school = isEmpty_(data.school) === true ?  '' : data.school;
    data.from = isEmpty_(data.from) === true ? '' : data.from;
    data.degree = isEmpty_(data.degree) === true ? '' : data.degree;
    data.fieldofstudy = isEmpty_(data.fieldofstudy) === true ? '' : data.fieldofstudy;

    
    if (Validator.isEmpty(data.school)) 
        errors.school = 'School field is required';
    
    if (Validator.isEmpty(data.degree)) 
        errors.degree = 'School field is required';
    
    if (Validator.isEmpty(data.from)) 
        errors.from = 'From date field is required';
    
    if (Validator.isEmpty(data.fieldofstudy)) 
        errors.fieldofstudy = 'Field of study field is required';
    
    return {
        errors,
        isValid: isEmpty_(errors)
    }

}

export default validatateEducation;
