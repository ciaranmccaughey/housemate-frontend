import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import SplitEven from "./SplitEven/SplitEven";
import './Split.sass';

class Split extends Component {
	state = {
		mates: this.props.mates,
		expense: this.props.expense,
		numberOfMates: this.props.mates.length,
		excludeMates: []
	};

    removeMate = mateToRemove => {

        const mates = this.state.mates.filter(mate => mate.id != mateToRemove.id);
        const excludeMates = [...this.state.excludeMates, mateToRemove];
        const numberOfMates = mates.length;

        this.setState({ mates, excludeMates, numberOfMates});

    };

    addMate = mateToAdd => {

        const excludeMates = this.state.excludeMates.filter(mate => mate.id != mateToAdd.id);
        const mates = [...this.state.mates, mateToAdd];
        const numberOfMates = mates.length;

        this.setState({ mates, excludeMates, numberOfMates});
        
    };
	render() {

		console.log(this.props);
		return (
			<>
				<div style={{ display: "flex", flexDirection: "column" }}>
					{this.state.mates.map((mate, index) => {
						const amount = this.props.expense.amount / this.state.numberOfMates;

						return (

							<div key={index} className="box selected-split-box" onClick={() => this.removeMate(mate)} style={{ margin: "5px 5px" }}>
								<div style={{display: 'flex', justifyContent: 'space-between',}}>
									<div className='selected-split-icon'><FontAwesomeIcon icon={faCheckCircle} /></div>
									<div className='selected-split-name'>{mate.name}</div>
									<div>£{(Math.round(amount * 100) / 100).toFixed(2)}</div>
								</div>
							</div>
							
						);
					})}

					{this.state.excludeMates.map((mate, index) => {
						return (
							<div key={index * 10} className="box" onClick={() => this.addMate(mate)} style={{ margin: "5px 5px" }}>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<div><FontAwesomeIcon icon={faCheckCircle} /></div>
									<div>{mate.name}</div>
									<div>£0</div>
								</div>
							</div>
						);
					})}

					<button type="button" className="button is-link" onClick={() => this.props.addExpense(this.state.mates)} style={{width: "100%"}}>
						Add Expense
					</button>
				</div>
			</>
		);
	}
}

export default Split;
