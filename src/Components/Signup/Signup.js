import React, { Component } from "react";
import axios from "../../axios-instance";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../auth-wrapper";

const Signup = props => {

	const { signupSubmit } = useAuth();
	const { setEmail, setShowScreen } = props;

	return (
		<div style={{ margin: "5%" }}>
			<Formik
				initialValues={{ name: "", email: "", password: "" }}
				onSubmit={async (values, { setSubmitting }) => {
					const success = await signupSubmit(values);

					if (success) {
						setEmail(values.email);
						setShowScreen('login');
					}
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required("Required"),
					email: Yup.string().required("Required"),
					password: Yup.string().required("Required")
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
									{errors.name && touched.name ? <p className="help is-danger">Please enter an email.</p> : null}
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
