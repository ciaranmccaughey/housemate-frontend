import React, { useState } from 'react';
import AddExpense from './AddExpense/AddExpense';
import ExpenseList from './ExenseList/ExpenseList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import './Expense.sass';
import ViewExpense from './ViewExpense';

const LIST = 'list';
const ADD = 'add';
const VIEW_EXPENSE = 'view_expense';

const Expense = props => {
    // props
    const { group, expenses, categories, setExpenses } = props;
    // state
    const [ view, setView ] = useState(LIST);
    const [ expense, setExpense ] = useState(LIST);
    

    const viewExpense = expense => {
        setView(VIEW_EXPENSE);
        setExpense(expense);
        console.log(expense)
    }

    let render = null;

    if (view == LIST) {
        render = <ExpenseList expenses={expenses} group={group} viewExpense={viewExpense} />;
    }

    if (view == ADD) {
        render = <AddExpense categories={categories} group={group} setView={setView} expenses={expenses} setExpenses={setExpenses} />;
    }

    if (view == VIEW_EXPENSE) {
        render = <ViewExpense group={group} setView={setView} expense={expense} />;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            {view != ADD ? <button className="button is-link floating-button" onClick={() => setView(ADD)}><FontAwesomeIcon icon={faPlus} /></button> : null}
            {render}
        </div>
    )
}

export default Expense;