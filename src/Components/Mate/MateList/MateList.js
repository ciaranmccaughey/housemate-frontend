import React from 'react';
import MateRow from './MateRow/MateRow';

const MateList = props => {

    const { mates } = props;

    return (
        <div style={{ height: "100%", overflow: "scroll", marginBottom: "65px"}}>
            <div className="expense-list-header" style={{display: 'flex'}}>
                <div className="expense-list-title">m8s</div>
                <div className="expense-list-total">Add a m8</div>

            </div>
            {mates ? mates.map(mate => <MateRow key={mate.id} mate={mate} />)
            : null
            }
        </div>
    )
}

export default MateList;