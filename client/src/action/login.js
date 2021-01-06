import Validate  from "../components/Validation";
import {InitRoundScore} from './roundScore.js';

export const checkSession = (app) => {
    const url = "/api/users/check-session";
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                if(json.currentUser.role==='user'){
                    app.setState({ currentUser: json.currentUser });
                }else if(json.currentUser.role==='admin'){
                    app.setState({ currentAdmin: json.currentUser });
                }
            }
        })
        .catch(error => {
            console.log("Check Session Error: ",error);
        });
};

export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        errors: {}
    });

    loginComp.setState({
        [name]: value
    });
};

export const login = (e, loginComp, app) => {
    e.preventDefault();

    loginComp.setState({
        errors: {}
    });

    var err=Validate(loginComp.state);
    if(Object.keys(err).length!==0){
        loginComp.setState({
            errors: err
        });
        return 
    }
    
    const request = new Request("/api/users/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            return res.json();
        })
        .then(json => {
            if (json && json.currentUser !== undefined) {
                if(json.currentUser.role==='admin'){
                    app.setState({ currentAdmin: json.currentUser });
                }else{
                    app.setState({ currentUser: json.currentUser });
                    
                    for(var i=1; i<= app.state.NumOfRound; i++){
                        InitRoundScore(i);
                    }
                }
            }else if(json && json.Error){
                loginComp.setState({
                    errors: json.Error
                });
            }
        })
        .catch(error => {
            console.log("Error: ", error);
        });
};

export const logout = (app) => {
    const url = "/api/users/logout";

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                currentAdmin: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            console.log(error);
        });
};
