import React from 'react';
import ExpenseRow from './ExpenseRow/ExpenseRow';
import './ExpenseList.sass';

const ExpenseList = props => {
    console.log(props)
    return (
        <>
            <div className="list-container">
                <div className="expense-list-header" style={{display: 'flex'}}>
                    <div className="expense-list-title">My Group</div>
                    <div className="expense-list-total">Total: $200</div>
                    <div className="expense-list-filter-container">
                        {/* <div className="expense-list-filter-title">m8s</div> */}
                        {/* {props.group.users ? props.group.users.map(mate => <div className="expense-list-filter-mate">{mate.name}</div>) : null} */}
                    </div>
                </div>
                {props.expenses.length ? props.expenses.map(expense => <ExpenseRow key={expense.id} expense={expense} />)
                : null
                }
            </div>
        </>
    )
}

export default ExpenseList;