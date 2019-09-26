import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from '../../axios-instance';

const GroupNameForm = props => {

    const { group, onGroupNameChange } = props;


    const updateGroupName = async values => {

        const postData = {
            action: 'update_name',
            group_id: group.id,
            ...values
        }

		const res = await axios.post('group/index.php', postData)
		const { data, success, message } = res.data;
		
        if (success) {
			// update the group name
			const updateGroup = {...group, name: values.name};
			onGroupNameChange(updateGroup);
        }
    }
	
	return (
		<div style={{margin: '5%'}}>
			<Formik
				initialValues={{ name: group.name, email: ""}}
				onSubmit={(values, { setSubmitting }) => {
                    updateGroupName(values);
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
									Group Name
								</label>
								<div className="control">
									<input id="name" placeholder="m8s name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className={'input ' + (errors.name && touched.name ? 'is-danger' : '')} />
								</div>
								{errors.name && touched.name ? <p className="help is-danger">Please enter a name.</p> : null}
							</div>

							<button type="submit" className="button is-link"  style={{margin: "20px 5%", width: '90%'}}
							// disabled={isSubmitting}
							>
								Update
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default GroupNameForm;
