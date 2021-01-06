import Validate  from "../components/Validation";

export const updateRegisterForm = (registerComp, field) => {
    const value = field.value;
    const name = field.name;

    registerComp.setState({
        errors: {}
    });

    registerComp.setState({
        [name]: value
    });
};

export const register = (e, registerComp, app) => {
    e.preventDefault();
    var err=Validate(registerComp.state);
    if(Object.keys(err).length!==0){
        registerComp.setState({
            errors: err
        });
    }else{
        registerComp.setState({
            errors: {}
        });
        
        const request = new Request("/api/users/register", {
            method: "post",
            body: JSON.stringify(registerComp.state),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
    
        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    registerComp.setState({
                        isOpen:true, 
                        message:'Registration Success', 
                        type:'success'
                    })
                }else if(res.status===409){
                    registerComp.setState({
                        isOpen:true, 
                        message:'You are already registered, please log in', 
                        type:'error'
                    })
                }
                return res.json();
            })
            .then(json => {
                console.log(json.Error)
                if(json.Error ){
                    registerComp.setState({
                        errors: json.Error
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
};