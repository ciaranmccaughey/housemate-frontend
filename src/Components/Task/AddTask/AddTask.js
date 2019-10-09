import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from '../../../axios-instance';


const AddTask = props => {

    const { group, user, addTaskToGroup, setView } = props;


    const addTask = async values => {
        
        const postData = {
            action: 'add',
            group_id: group.id,
            name: values.task,
            user_id: user.id
        }

		const res = await axios.post('task/index.php', postData)
		const { data, success, message } = res.data;
		
        if (success) {
			addTaskToGroup({name: values.task, completed: 'f', ...data});
			setView('list');
        }
    }
	
	return (
			<>
				<div className="expense-list-header" style={{ display: "flex" }}>
					<div className="expense-list-title">Add Task</div>
				</div>
				<div className="expense-render-container">
					<Formik
						initialValues={{ task: ""}}
						onSubmit={(values, { setSubmitting }) => {
							addTask(values);
						}}
						validationSchema={Yup.object().shape({
							task: Yup.string()
								.required("Required"),
						})}
					>
						{formikProps => { 
							const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = formikProps;
							return (
								<form onSubmit={handleSubmit}>
									<div className="field">
										<label className="label" htmlFor="name">
											Task
										</label>
										<div className="control">
											<input id="task" placeholder="task name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className={'input ' + (errors.name && touched.name ? 'is-danger' : '')} />
										</div>
										{errors.name && touched.name ? <p className="help is-danger">Please enter a name.</p> : null}
									</div>

									<button type="submit" className="button is-link"  style={{margin: "20px 5%", width: '90%'}}
									// disabled={isSubmitting}
									>
										Add task
									</button>
								</form>
							);
						}}
					</Formik>
				</div>
			</>
	);
};

export default AddTask;
