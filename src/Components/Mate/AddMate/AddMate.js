import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from '../../../axios-instance';
import './AddMate.sass';


const AddMate = props => {

    const { group, addMateToGroup, setView } = props;


    const addMate = async values => {

        const postData = {
            action: 'add',
            user_id: 7,
            group_id: group.id,
            ...values
        }

		const res = await axios.post('mate/index.php', postData)
        const { data, success, message } = res.data;
        if (success) {

			addMateToGroup(data);
			setView('list');
        }
    }
	
	return (
		<div style={{margin: '5%'}}>
			<Formik
				initialValues={{ name: "", email: ""}}
				onSubmit={(values, { setSubmitting }) => {
                    addMate(values);
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
									<input id="name" placeholder="m8s name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className={'input ' + (errors.name && touched.name ? 'is-danger' : '')} />
								</div>
								{errors.name && touched.name ? <p className="help is-danger">Please enter a name.</p> : null}
							</div>

                            <div className="field">
								<label className="label" htmlFor="email">
									Email
								</label>
								<div className="control">
									<input id="email" placeholder="m8s email" type="text" value={values.email} onChange={handleChange} onBlur={handleBlur} className="input" />
								</div>
								<p className="help">Enter an email address if you want your m8 invited.</p>
							</div>


							<button type="submit" className="button is-link"  style={{margin: "20px 5%", width: '90%'}}
							// disabled={isSubmitting}
							>
								Add m8
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default AddMate;
