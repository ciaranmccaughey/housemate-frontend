import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ExpenseList from "../ExenseList/ExpenseList";
import './AddExpense.sass';

const ExpenseForm = props => {
	const { addExpenseDetails } = props;

	return (
		<div>
			<Formik
				initialValues={{ description: "", amount: "", comment: "", category_id: "", purchased_date: new Date() }}
				onSubmit={(values, { setSubmitting }) => {
					console.log('onSubmit', values);

					addExpenseDetails(values);
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
								<label className="label" htmlFor="email">
									Description
								</label>
								<div className="control">
									<input id="description" placeholder="Enter your expense" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className="input" />
								</div>
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Amount ($)
								</label>
								<div className="control">
									<input id="amount" placeholder="Enter your Amount" type="text" value={values.amount} onChange={handleChange} onBlur={handleBlur} className="input" />
								</div>
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Category
								</label>
								<div className="select is-medium">
									<select name="category_id" value={values.color} onChange={handleChange} onBlur={handleBlur} style={{ display: "block" }}>
										<option value="" label="Select a Category" />
										{props.categories.map(category => (
											<option key={category.id} value={category.id} label={category.name} />
										))}
									</select>
								</div>
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Comment
								</label>
								<div className="control">
									<textarea
										id="comment"
										component="textarea"
										placeholder="Additional Comments"
										type="textarea"
										value={values.comment}
										onChange={handleChange}
										onBlur={handleBlur}
										className="textarea"
									/>
								</div>
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Date Expensed
								</label>
								<div input="control">
									<input
										id="purchased_date"
										component="date"
										placeholder="Additional Comments"
										type="date"
										value={values.purchased_date}
										onChange={handleChange}
										onBlur={handleBlur}
										className="date"
									/>
								</div>
							</div>
							
							<button type="submit" className="button is-primary"  style={{width: "100%"}}>
								Split with m8s
							</button>
							<button type="button" className="button is-link"  style={{width: "100%", marginTop: "8px"}} onClick={() => {
								console.log('clicked', values);
								addExpenseDetails(values, true);
								}}>
								Add expense
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default ExpenseForm;
