import React from 'react';
import AddExpense from './AddExpense/AddExpense';

const Expense = props => {

    return (
        <div>
            <button className="button is-link">Add Expense</button>
            <AddExpense />
        </div>
    )
}

export default Expense;