import React, { Component } from "react";
import axios from "../../axios-instance";

class Signup extends Component {
	state = {
		isLoading: false,
		name: "",
		email: "",
		password: ""
	};

	constructor(props) {
		super(props);
	}

	handleChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({ [name]: value });
	};

	onSubmit = async () => {
		// set post data
		const postData = {
			...this.state,
			action: "signup"
		};

		// make call
		const res = await axios.post("auth/index.php", postData);
		this.setState({ isLoading: true });
		const { data, success, message } = res.data;
		this.setState({ isLoading: false });

		if (success) {
			// route to login
			this.props.setEmail(this.state.email);
			this.props.setShowScreen('login');
        }

	};

	render() {
		return (
			<div className="container is-flex" style={{justifyContent: 'center', alignItems: 'center'}}>
				<div className="box"  style={{ minWidth: "80%"}}>
					<label className="label">Name</label>
					<div className="field">
						<div className="control">
							<input className="input" type="text" placeholder="Firstname" value={this.state.name} onChange={this.handleChange} name="name" />
						</div>
					</div>

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
							<button className="button is-link" onClick={this.onSubmit} disabled={this.state.isLoading}>
								Signup
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
