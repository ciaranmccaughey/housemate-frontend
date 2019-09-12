import React from 'react';
import MateRow from './MateRow/MateRow';

const MateList = props => {

    const { mates } = props;

    return (
        <div style={{ height: "100%", overflow: "scroll", marginBottom: "65px"}}>
            {mates ? mates.map(mate => <MateRow key={mate.id} mate={mate} />)
            : null
            }
        </div>
    )
}

export default MateList;