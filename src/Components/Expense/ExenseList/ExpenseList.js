import React from 'react';
import ExpenseRow from './ExpenseRow/ExpenseRow';
import './ExpenseList.sass';
import { useAuth } from '../../../auth-wrapper';

const ExpenseList = props => {
    const { expenses, viewExpense, totalExpenses} = props;
    const { currencySymbol } = useAuth();

    return (
        <>
            <div className="list-container">
                <div className="expense-list-header" style={{display: 'flex'}}>
                    <div className="expense-list-title">Expenses</div>
                    <div className="expense-list-total">Total: {currencySymbol}{totalExpenses}</div>

                </div>
                {expenses.length ?
                    (<div className="expense-row-list-container">
                        {expenses.map(expense => <ExpenseRow key={expense.id} expense={expense} viewExpense={viewExpense} />)}
                    </div>)
                : null
                }
            </div>
        </>
    )
}

export default ExpenseList;