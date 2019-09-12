import React, { useState, useEffect, useContext } from 'react';
import Nav from '../../Nav/Nav';
import './ViewGroup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import Expense from '../../Expense/Expense';
import axios from 'axios';
import Mate from '../../Mate/Mate';
// import Context from '../../../context';

const ViewGroup = ({ group, showArea, categories, addMateToGroup }) => {

    const [ view, setView ] = useState('overview');
    const [ expenses, setExpenses ] = useState([]);

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = async () => {
        const res = await axios.get("http://housem8.local/api/expense/index.php?action=getExpenses&group_id="+ group.id);

        if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
                setExpenses(data);
			}
		}
    }

    let render = null;
    if (view === 'overview') {
        render = <div>Overview</div>
    }

    if (view === 'expenses') {
        render = <Expense categories={categories} group={group} expenses={expenses} setExpenses={setExpenses} />
    }

    if (view === 'm8s') {
        render = <Mate group={group} addMateToGroup={addMateToGroup} />
    }

    return(
        <div>
            <div className="header-container">
                    <div className="back-icon">
                        <FontAwesomeIcon icon={faChevronLeft} onClick={() => showArea('list')}/>
                    </div>
                    <span className="header-title">{group.name}</span>
                    <div className="back-icon">
                        <FontAwesomeIcon icon={faCog} />
                    </div>
            </div>

            <div>
                {render}
            </div>

			<Nav view={view} setView={setView} />

        </div>
    )
}


export default ViewGroup;