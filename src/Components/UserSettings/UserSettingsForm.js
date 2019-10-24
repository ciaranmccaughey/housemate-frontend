import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from '../../axios-instance';

const UserSettingsForm = props => {

    const { user } = props;
    const [currencies, setCurrencies] = useState(false);
    
    useEffect(() => {
		getCurrency();
	}, []);


    const updateUser = async values => {

        const postData = {
			action: "update_user",
			...values
           
        }

		const res = await axios.post('user/index.php', postData)
		const { data, success, message } = res.data;

        if (success) {
			return;
        }
    }

    const getCurrency = async () => {
		const res = await axios.get("util/index.php?action=get_currency");

		if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				setCurrencies(data);
			}
		}
	}
	
	return (
		<div style={{margin: '5%'}}>
			<Formik
				initialValues={{ name: user.name, email: user.email, currency_id: user.currency_id}}
				onSubmit={(values, { setSubmitting }) => {
					// setSubmitting(true);
                    updateUser(values);
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
								<label className="label" htmlFor="name">
									Email
								</label>
								<div className="control">
									<input id="email" placeholder="email" type="text" value={values.email} onChange={handleChange} onBlur={handleBlur} className={'input ' + (errors.email && touched.email ? 'is-danger' : '')} />
								</div>
								{errors.email && touched.email ? <p className="help is-danger">Please enter a email.</p> : null}
							</div>

                            <div className="field">
								<label className="label" htmlFor="email">
									Currency
								</label>
								<div className="select is-medium">
									<select name="currency_id" value={values.color} onChange={handleChange} onBlur={handleBlur} style={{ display: "block", width: "100%" }} className={'input ' + (errors.currency_id && touched.currency_id ? 'is-danger' : '')}>
										<option value="" label="Select a Currency" />
										{currencies ? currencies.map(currency => (
											<option key={currency.id} value={currency.id} label={currency.code + ' - ' + currency.country} selected={currency.id == user.currency_id}/>
										)) : null}
									</select>
								</div>
								{errors.currency_id && touched.currency_id ? <p className="help is-danger">Please select a currency.</p> : null}

							</div>

							<button type="submit" className="button is-link"  style={{margin: "5px 5%", width: '90%'}} disabled={isSubmitting} >
								Update
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default UserSettingsForm;
