import React, { Component } from "react";
import axios from 'axios';

class Login extends Component {

	state = {
		email: "",
		password: ""
    };
    
    constructor(props) {
        super(props);
        this.state.email = this.props.email;
    }

    componentDidMount(){
        const value = this.context;

      }

	handleChange = event => {
        const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({ [name]: value });
    };

    loginSubmit = async () => {

        const postData =  {
            ...this.state,
            action: 'login'
        }

		const res = await axios.post("http://housem8.local/api/auth/index.php", postData);
		const { data, success, message } = res.data;
        
        if (success) {
            // route to app
            this.props.setIsAuth({user: data, isAuth: true});

        }
        
    }

	render() {
		return (
			<div className="container is-flex" style={{ justifyContent: "center", alignItems: "center" }}>
				<div className="box">
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
							<input className="input" type="email" placeholder="email" value={this.state.email} onChange={this.handleChange} name="email" />
						</div>
					</div>

					<div className="field">
						<label className="label">Password</label>
						<div className="control">
							<input className="input" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange} name="password" />
						</div>
					</div>

                    <div className="field is-grouped">
						<div className="control">
							<button className="button is-link" onClick={this.loginSubmit} disabled={this.state.isLoading}>
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
