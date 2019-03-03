// const checkIfEmpty = (value) => {
//     ObjectChecker(value);
//     valueChecker(value)
// }


// const ObjectChecker = value => {
//       if (typeof value === 'object' && Object.keys(value).length === 0)
//          return true
// }
// const valueChecker = value => {
//     if (value === undefined || value === null || value === 'undefined')
//         return true;
   
//     if (typeof value === 'string' && value.trim().length === 0)
         
//         return true
// }

// export default checkIfEmpty;


const isEmpty_ = (value) => {
    if (value === undefined ||
          value === 'undefined' ||
          value === null ||
          (typeof value === 'object' && Object.keys(value).length === 0) ||
          (typeof value === 'string' && value.trim().length === 0)
    ) {
      return true;
    }
  };

  export default isEmpty_;
