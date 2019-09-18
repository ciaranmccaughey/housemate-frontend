import React, { useState } from 'react';
import AddExpense from './AddExpense/AddExpense';
import ExpenseList from './ExenseList/ExpenseList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import './Expense.sass';

const LIST = 'list';
const ADD = 'add';

const Expense = props => {

    const [ view, setView ] = useState(LIST);
    
    const { group, expenses, categories, setExpenses } = props;

    let render = null;

    if (view == LIST) {
        render = <ExpenseList expenses={expenses} group={group} />;
    }

    if (view == ADD) {
        render = <AddExpense categories={categories} group={group} setView={setView} expenses={expenses} setExpenses={setExpenses} />;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            {view != ADD ? <button className="button is-link floating-button" onClick={() => setView(ADD)}><FontAwesomeIcon icon={faPlus} /></button> : null}
            {render}
        </div>
    )
}

export default Expense;