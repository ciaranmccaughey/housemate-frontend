import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../auth-wrapper";

const Login = props => {

	const { loginSubmit } = useAuth();
	const [usernameOrPass, setUsernameOrPass] = useState(false);

	return (
		<div style={{ margin: "5%" }}>
			<Formik
				initialValues={{ email: props.email, password: "" }}
				onSubmit={ async (values, { setSubmitting }) => {
					const success = await loginSubmit(values);

					if (!success) {
						setUsernameOrPass(true);
					}
				}}
				validationSchema={Yup.object().shape({
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
										className={"input " + (errors.email && touched.email ? "is-danger" : "")}
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
							{usernameOrPass ? <p className="help is-danger">Username or password is incorrect.</p> : null}

							<button
								type="submit"
								className="button is-link"
								style={{ margin: "20px 5%", width: "90%" }}
								// disabled={isSubmitting}
							>
								Login
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default Login;
