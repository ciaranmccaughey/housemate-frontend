import React, { useState } from "react";
import axios from '../../../axios-instance';
import { useAuth } from '../../../auth-wrapper';
import { Formik } from "formik";
import * as Yup from "yup";

const AddGroup = props => {

	const { showArea } = props;

	const { user } = useAuth();
    

    const onAddGroup = async values => {

        const postData = {
            action: 'create',
            ...values
        }
        const res = await axios.post('group/index.php', postData)
		const { data, success, message } = res.data;
		
        if (success) {
			// update groups state
			props.showArea("list");
			props.addGroup({id: data.id, name: values.name, users: [user]});
            // return to main app
        }
    }

	return (
		<>
			<div className="expense-list-header" style={{ display: "flex", top: 0 }}>
				<div className="expense-list-title">Add group</div>

			</div>
			<div className="expense-render-container">
				<Formik
					initialValues={{ name: ""}}
					onSubmit={(values, { setSubmitting }) => {
						onAddGroup(values);
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
										<input id="name" placeholder="Group Name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className={'input ' + (errors.name && touched.name ? 'is-danger' : '')} />
									</div>
									{errors.name && touched.name ? <p className="help is-danger">Please enter a name.</p> : null}
								</div>

								<button type="submit" className="button is-link"  style={{margin: "20px 5%", width: '90%'}}
								// disabled={isSubmitting}
								>
									Add Group
								</button>
							</form>
						);
					}}
				</Formik>
			</div>
		</>

	);
};

export default AddGroup;
