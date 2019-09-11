import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const AddMate = props => {

    const { group, mates, setMates, setView } = props;


    const addMate = async values => {

        const postData = {
            action: 'add',
            user_id: 7,
            group_id: group.id,
            ...values
        }

		const res = await axios.post('http://housem8.local/api/mate/index.php', postData)
        const { data, success, message } = res.data;
        if (success) {

			if (mates) {
				setMates([...mates, data]);
			} else {
				setMates([data]);
			}
			
			setView('list');
        }
    }
	
	return (
		<div>
			<Formik
				initialValues={{ name: "", email: ""}}
				onSubmit={(values, { setSubmitting }) => {
                    addMate(values);
				}}
				// validationSchema={Yup.object().shape({
				// 	email: Yup.string()
				// 		.email()
				// 		.required("Required")
				// })}
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
									<input id="name" placeholder="m8s name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className="input" />
								</div>
							</div>

                            <div className="field">
								<label className="label" htmlFor="email">
									Email
								</label>
								<div className="control">
									<input id="email" placeholder="m8s email" type="text" value={values.email} onChange={handleChange} onBlur={handleBlur} className="input" />
								</div>
							</div>

                            <div className="field">
								<label className="label" htmlFor="email">
									Invite m8
								</label>
								<div className="control">
									<input id="invite" type="checkbox" value={values.invite} onChange={handleChange} onBlur={handleBlur} className="checkbox" />
								</div>
							</div>

							<button type="submit" className="button is-link" 
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
