import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { useAuth } from '../../../../../auth-wrapper';


const SplitEven = props => {
    
    const [ mates, setMates ] = useState(props.mates);
    const [ excludeMates, setExcludeMates ] = useState([]);
    const [ numberOfMates, setNumberOfMates ] = useState(props.mates.length);
    const { currencySymbol } = useAuth();
    

    const removeMate = mateToRemove => {

        const mates = mates.filter(mate => mate.id != mateToRemove.id);
        const excludeMates = [...excludeMates, mateToRemove];
        const numberOfMates = mates.length;

        setMates(mates);
        setExcludeMates(excludeMates);
        setNumberOfMates(numberOfMates);

    };

    const addMate = mateToAdd => {

        const excludeMates = excludeMates.filter(mate => mate.id != mateToAdd.id);
        const mates = [...mates, mateToAdd];
        const numberOfMates = mates.length;

        setMates(mates);
        setExcludeMates(excludeMates);
        setNumberOfMates(numberOfMates);
        
    };


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {mates.map((mate, index) => {
                const amount = props.expense.amount / numberOfMates;

                return (
                    <div className="box" onClick={() => removeMate(mate)}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            
                            <div style={ {color: 'green', fontSize: '20px'}}>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                            
                            <div>{mate.name}</div>
                            <div>{currencySymbol}{(Math.round(amount * 100) / 100).toFixed(2)}</div>
                        </div>
                    </div>
                );
            })}

            {excludeMates.map((mate, index) => {
                return (
                    <div className="box" onClick={() => addMate(mate)}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            
                            <div style={ {color: 'red', fontSize: '20px'}}>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                            
                            <div>{mate.name}</div>
                            <div>{currencySymbol}0</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default SplitEven;