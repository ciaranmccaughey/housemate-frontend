import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from '../../../auth-wrapper';

import './AddExpense.sass';

const ExpenseForm = props => {
	const { addExpenseDetails } = props;
	const { currencySymbol } = useAuth();

	const [ splitExpense, setSplitExpense ] = useState();

	return (
		<div>
			<Formik
				initialValues={{ description: "", amount: "", comment: "", category_id: "", purchased_date: new Date() }}
				onSubmit={(values, { setSubmitting }) => {
					addExpenseDetails(values, splitExpense);
				}}
				validationSchema={Yup.object().shape({
					description: Yup.string()
						.required("Required"),
					amount: Yup.string()
						.required("Required"),
					category_id: Yup.string()
						.required("Required")
				})}
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
									<input id="description" placeholder="Enter your expense" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className={'input ' + (errors.description && touched.description ? 'is-danger' : '')} />
								</div>
								{errors.description && touched.description ? <p className="help is-danger">Please enter a description.</p> : null}
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Amount ({currencySymbol})
								</label>
								<div className="control">
									<input id="amount" placeholder="Enter your Amount" type="number" value={values.amount} onChange={handleChange} onBlur={handleBlur} className={'input ' + (errors.amount && touched.amount ? 'is-danger' : '')} />
								</div>
								{errors.amount && touched.amount ? <p className="help is-danger">Please enter an amount.</p> : null}
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Category
								</label>
								<div className="select is-medium">
									<select name="category_id" value={values.color} onChange={handleChange} onBlur={handleBlur} style={{ display: "block" }} className={'input ' + (errors.category_id && touched.category_id ? 'is-danger' : '')}>
										<option value="" label="Select a Category" />
										{props.categories.map(category => (
											<option key={category.id} value={category.id} label={category.name} />
										))}
									</select>
								</div>
								{errors.category_id && touched.category_id ? <p className="help is-danger">Please enter a category.</p> : null}

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
							
							<button type="submit" className="button is-primary"  style={{width: "100%"}} onClick={() => setSplitExpense(false)}>
								Split with m8s
							</button>
							<button type="submit" className="button is-link"  style={{width: "100%", marginTop: "8px"}} 
							onClick={() => {
								// console.log('clicked', values);
								setSplitExpense(true);
								}}
								>
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
