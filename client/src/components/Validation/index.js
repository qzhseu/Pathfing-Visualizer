
export default function validateInfo(values) {
    let errors ={}
    //Validate username
    if(values.hasOwnProperty('username')){
        if(values.username.length===0 || !values.username.trim()){
            errors.username = "Username required"
        }
    }
    

    //Validate email
    if(values.hasOwnProperty('email')){
        if(values.email.length===0){
            errors.email='Email required';
        }
    
    }
    
    //Validate password
    if(values.hasOwnProperty('password')){
        if(values.password.length===0){
            errors.password='Password is required';
        }else if(values.password.length<4){
            errors.password="Password needs to be 4 characters or more";
        }
    }
    

    //Validate confirmed password
    if(values.hasOwnProperty('confirm')){
        if(values.confirm.length===0){
            errors.confirm="Password is required";
        }else if(values.password!==values.confirm){
            errors.confirm ='Passwords do not match';
        }
    }
    
    //console.log(errors)
    return errors;
}
