module.exports = {
    handleValidationError: (errors) => {
       let Errors={}
       const allErrors=errors.substring(errors.indexOf(':')+1).trim();
       const allErrorsInArray=allErrors.split(',').map(err=>err.trim())
       allErrorsInArray.forEach(e=>{
           const [key,value] =e.split(':').map(err=>err.trim())
           Errors[key]=value
       })
       return Errors;
    }
}