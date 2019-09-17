import React from 'react';
import ExpenseRow from './ExpenseRow/ExpenseRow';

const ExpenseList = props => {
    
    return (
        <div style={{ height: "100%", overflow: "scroll", marginBottom: "65px"}}>
            {props.expenses.length ? props.expenses.map(expense => <ExpenseRow key={expense.id} expense={expense} />)
            : null
            }
        </div>
    )
}

export default ExpenseList;