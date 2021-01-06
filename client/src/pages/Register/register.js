import React, {Component} from 'react';
import { Link, NavLink,withRouter } from 'react-router-dom';
import {updateRegisterForm, register} from "../../action/register";
import Notification from "../../components/Notification";

import "./styles.css"

class Register extends Component{
    constructor(props){
        super(props);
        this.props.history.push("/register");
    }

    state = {
        username:'',
        email:'',
        password:'',
        confirm:'',
        errors:{},

        isOpen:false, 
        message:'', 
        type:''
    }

    render(){
        const { app } = this.props
        return(
        <div className="home">
            <Notification 
                    notify={this.state}
                    setNotify={this.setState.bind(this)}
            />
            <div className="home__Aside">
            </div>
            <div className="home__Form">
                <div className='PageSwitcher'>
                    <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className='PageSwitcher__Item--SignIn'>Sign In</NavLink>
                    <NavLink exact to="/register" activeClassName="PageSwitcher__Item--Active" className='PageSwitcher__Item--SignUp'>Sign Up</NavLink>
                </div>

                <div className="FormTitle">
                    <NavLink to="/"  className="FormTitle__Link">Sign In</NavLink> or
                    <NavLink exact to="/register" activeClassName="FormTitle__Link--Active"  className="FormTitle__Link">Sign Up</NavLink>
                </div>

                <div className="FormCenter">
                    <form className="FormFields" onSubmit={e=>register(e, this, app)}>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="username">UserName</label>
                            
                            <input type="text" id="username" className="FormField__Input" placeholder="Enter your username" name="username"
                            value={this.state.username} onChange={e => updateRegisterForm(this, e.target)}></input>
                            {this.state.errors.username && <p className="FormField__Error">{this.state.errors.username}</p>}
                        </div>
                        <div className="FormField">                            
                            <label className="FormField__Label" htmlFor="email">Email</label>
                            <input type="text" id="email" className="FormField__Input" placeholder="Enter your email address" name="email"
                            value={this.state.email} onChange={e => updateRegisterForm(this, e.target)}></input>
                            {this.state.errors.email && <p className="FormField__Error">{this.state.errors.email}</p>}
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Password</label>
                            <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password"
                            value={this.state.password} onChange={e => updateRegisterForm(this, e.target)}></input>
                            {this.state.errors.password && <p className="FormField__Error">{this.state.errors.password}</p>}
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="confirm">Confirm Password</label>
                            <input type="password" id="confirm" className="FormField__Input" placeholder="Confirm your password" name="confirm"
                            value={this.state.confirm} onChange={e => updateRegisterForm(this, e.target)}></input>
                            {this.state.errors.confirm && <p className="FormField__Error">{this.state.errors.confirm}</p>}
                        </div>

                        <div className="FormField">
                            <button className="FormField__Button"> Sign Up</button>
                            <Link to="/" className="FormField__Link">I'm already a member</Link>
                        </div>
                            
                    </form>
                </div> 
            </div>
        </div>
        );
    }
}

export default withRouter(Register);
/*reference: https://www.youtube.com/watch?v=56E8b9prPTs*/