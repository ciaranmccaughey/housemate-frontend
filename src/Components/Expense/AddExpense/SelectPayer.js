import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import './SelectPayer.sass';

const SelectPayer = ({ mates, setPayer }) => {
    
	const [ selected, setSelected ] = useState(0);
	
	return (
		<>
		<div style={{fontSize: "24px", fontWeight: "bold"}}>Who paid?</div>
			{mates
				? mates.map((mate, index) => {
						return (
							<div onClick={() => setSelected(index)} className={ index == selected ? 'box selected-payer-box' : 'box'} style={{ margin: "10px" }}>
								<div style={{display: 'flex', justifyContent: 'space-between',}}>
									<div className={ index == selected ? 'selected-payer-icon' : ''}><FontAwesomeIcon icon={faCheckCircle} /></div>
									<div className={ index == selected ? 'selected-payer-name' : ''}>{mate.name}</div>
								</div>
							</div>
						);
				  })
				: null}

				<button type="submit" className="button is-link" style={{width: "100%"}} onClick={() => setPayer(mates[selected])} >
					Next
				</button>
		</>
	);
};

export default SelectPayer;


// 