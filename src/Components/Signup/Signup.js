import React, { useEffect, useState } from "react";
import axios from "../../axios-instance";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../auth-wrapper";

const Signup = props => {

	const { signupSubmit } = useAuth();

	const [ groupPin, setGroupPin ] = useState();
	const [currencies, setCurrencies] = useState(false);
	const [serverError, setServerError] = useState(false);

	const { setEmail, setShowScreen } = props;


	useEffect(() => {
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let group_pin = params.get('group');
		setGroupPin(group_pin);
		getCurrency();

	}, []);

	const getCurrency = async () => {
		const res = await axios.get("util/index.php?action=get_currency");

		if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				setCurrencies(data);
			}
		}
	}

	return (
		<div style={{ margin: "auto", maxWidth: "400px" }}>
			<Formik
				initialValues={{ name: "", email: "", password: "", currency_id: "" }}
				onSubmit={async (values, { setSubmitting }) => {
					
					const { success, message } = await signupSubmit({...values, 'group_pin': groupPin});
					console.log('Signup: ', success, message);
					if (success) {
						setEmail(values.email);
						setShowScreen('login');
					} else {
						setServerError(message);
					}
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required("Required"),
					email: Yup.string().required("Required"),
					password: Yup.string().required("Required"),
					currency_id: Yup.string().required("Required")
				})}
			>
				{formikProps => {
					const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = formikProps;
					return (
						<form onSubmit={handleSubmit}>
							<div className="field">
								<label className="label" htmlFor="email">
									Name
								</label>
								<div className="control">
									<input
										id="name"
										placeholder="name"
										type="text"
										value={values.name}
										onChange={handleChange}
										onBlur={handleBlur}
										className="input"
										className={"input " + (errors.name && touched.name ? "is-danger" : "")}
									/>
									{errors.name && touched.name ? <p className="help is-danger">Please enter a name.</p> : null}
								</div>
							</div>
							<div className="field">
								<label className="label" htmlFor="email">
									Email
								</label>
								<div className="control">
									<input
										id="email"
										placeholder="Email"
										type="text"
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										className="input"
										className={"input " + (errors.password && touched.password ? "is-danger" : "")}
									/>
									{errors.email && touched.email ? <p className="help is-danger">Please enter an email.</p> : null}
								</div>
							</div>

							<div className="field">
								<label className="label" htmlFor="name">
									Password
								</label>
								<div className="control">
									<input
										id="password"
										placeholder="Password"
										type="password"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										className={"input " + (errors.password && touched.password ? "is-danger" : "")}
									/>
								</div>
								{errors.password && touched.password ? <p className="help is-danger">Please enter a password.</p> : null}
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Currency
								</label>
								<div className="select is-medium">
									<select name="currency_id" value={values.color} onChange={handleChange} onBlur={handleBlur} style={{ display: "block", width: "100%" }} className={'input ' + (errors.category_id && touched.category_id ? 'is-danger' : '')}>
										<option value="" label="Select a Currency" />
										{currencies ? currencies.map(currency => (
											<option key={currency.id} value={currency.id} label={currency.code + ' - ' + currency.country} />
										)) : null}
									</select>
								</div>
								{errors.currency_id && touched.currency_id ? <p className="help is-danger">Please select a currency.</p> : null}

							</div>

							{serverError ? <p className="help is-danger">{serverError}.</p> : null}


							<button
								type="submit"
								className="button is-link"
								style={{ margin: "20px 5%", width: "90%" }}
								// disabled={isSubmitting}
							>
								Signup
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default Signup;
