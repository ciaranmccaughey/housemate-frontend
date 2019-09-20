import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from '../../axios-instance';
import { userInfo } from "os";


const AddName = props => {

    const { user, setUser } = props;

    const addName = async values => {

        const postData = {
            action: 'addName',
            ...values
        }

		const res = await axios.post('auth/index.php', postData)
        const { data, success, message } = res.data;

        if (success) {
            setUser({...user, name: values.name})
        }
        console.log(data)
    }
	
	return (
		<div style={{margin: '5%'}}>
			<Formik
				initialValues={{ name: "", email: ""}}
				onSubmit={(values, { setSubmitting }) => {
                    addName(values);
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string()
						.required("Required"),
				})}
			>
				{formikProps => { 
					const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = formikProps;
					return (
						<form onSubmit={handleSubmit}>
							<div className="field">
								<label className="label" htmlFor="name">
									Name
								</label>
								<div className="control">
									<input id="name" placeholder="Enter your firstname" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className={'input ' + (errors.name && touched.name ? 'is-danger' : '')} />
								</div>
								{errors.name && touched.name ? <p className="help is-danger">Please enter a name.</p> : null}
							</div>

							<button type="submit" className="button is-link"  style={{margin: "20px 5%", width: '90%'}}
							// disabled={isSubmitting}
							>
								Add Name
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default AddName;
