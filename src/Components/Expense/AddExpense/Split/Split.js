import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import SplitEven from "./SplitEven/SplitEven";

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
							<div className="box" onClick={() => this.removeMate(mate)}>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<div style={{ color: "green", fontSize: "20px" }}>
										<FontAwesomeIcon icon={faCheckCircle} />
									</div>

									<div>{mate.name}</div>
									<div>£{(Math.round(amount * 100) / 100).toFixed(2)}</div>
								</div>
							</div>
						);
					})}

					{this.state.excludeMates.map((mate, index) => {
						return (
							<div className="box" onClick={() => this.addMate(mate)}>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<div style={{ color: "red", fontSize: "20px" }}>
										<FontAwesomeIcon icon={faCheckCircle} />
									</div>

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
