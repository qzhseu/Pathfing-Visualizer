import React, { Component } from 'react';
import {NavLink, Link, withRouter } from 'react-router-dom';
import {updateLoginForm, login} from "../../action/login";
import "./styles.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/");
    }

    state = {
        username:'',
        password:'',
        errors:{},
    }

    render() {
        const { app } = this.props
        return (
            <div className="home">
                <div className="home__Aside">
                </div>
                <div className="home__Form">
                    <div className='PageSwitcher'>
                        <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className='PageSwitcher__Item--SignIn'>Sign In</NavLink>
                        <NavLink exact to="/register" activeClassName="PageSwitcher__Item--Active" className='PageSwitcher__Item--SignUp'>Sign Up</NavLink>
                    </div>

                    <div className="FormTitle">
                        <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or
                        <NavLink exact to="/register" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                    </div>

                    <div className="FormCenter">
                        <form className="FormFields" onSubmit={e=>login(e, this, app)}>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="username">Username</label>
                                <input id="username" placeholder="Enter your username" name="username" className="FormField__Input"
                                    value={this.state.username} onChange={e => updateLoginForm(this, e.target)}></input>
                                {this.state.errors.username && <p className="FormField__Error">{this.state.errors.username}</p>}
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Password</label>
                                <input id="password" type="password" className="FormField__Input" placeholder="Enter your password" name="password"
                                    value={this.state.password} onChange={e => updateLoginForm(this, e.target)}></input>
                                {this.state.errors.password && <p className="FormField__Error">{this.state.errors.password}</p>}
                            </div>

                            <div className="FormField">
                                <button className="FormField__Button"> Sign In</button>
                                <Link to="/register" className="FormField__Link">Create an account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Login);
/*reference: https://www.youtube.com/watch?v=56E8b9prPTs*/