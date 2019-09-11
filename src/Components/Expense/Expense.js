import React, { useState } from 'react';
import AddExpense from './AddExpense/AddExpense';
import ExpenseList from './ExenseList/ExpenseList';

const Expense = props => {

    const [ view, setView ] = useState('list');
    
    const { group, expenses, categories, setExpenses } = props;

    let render = null;

    if (view == 'list') {
        render = <ExpenseList expenses={expenses} />;
    }

    if (view == 'add') {
        render = <AddExpense categories={categories} group={group} setView={setView} expenses={expenses} setExpenses={setExpenses} />;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <button className="button is-link" style={{ margin: "0 2%"}} onClick={() => setView('add')}>Add Expense</button>
            {render}
        </div>
    )
}

export default Expense;