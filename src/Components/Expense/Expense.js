import React, { useState } from 'react';
import AddExpense from './AddExpense/AddExpense';
import ExpenseList from './ExenseList/ExpenseList';

const LIST = 'list';
const ADD = 'add';

const Expense = props => {

    const [ view, setView ] = useState(LIST);
    
    const { group, expenses, categories, setExpenses } = props;

    let render = null;

    if (view == LIST) {
        render = <ExpenseList expenses={expenses} />;
    }

    if (view == ADD) {
        render = <AddExpense categories={categories} group={group} setView={setView} expenses={expenses} setExpenses={setExpenses} />;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            {view != ADD ? <button className="button is-link" style={{ margin: "0 2%"}} onClick={() => setView(ADD)}>Add Expense</button> : null}
            {render}
        </div>
    )
}

export default Expense;