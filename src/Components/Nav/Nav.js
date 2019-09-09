import React, { Component } from "react";
import "./Nav.css";
import NavItem from "./NavItem";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import { faWallet } from "@fortawesome/free-solid-svg-icons/faWallet";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";

class Nav extends Component {
	render() {
		return (
			<nav className="nav">
				<ul className="navbar-items">
					<NavItem title="Overview" icon={faChartLine}/>
					<NavItem title="Expenses" icon={faWallet}/>
					<NavItem title="M8s" icon={faUsers}/>
				</ul>
			</nav>
		);
	}
}

export default Nav;
