import React, { Component } from "react";
import "./Nav.sass";
import NavItem from "./NavItem";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import { faWallet } from "@fortawesome/free-solid-svg-icons/faWallet";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";

const Nav = ({ view, setView }) => {
	
	return (
		<nav className="nav">
			<ul className="navbar-items">
				<NavItem title="Overview" selected={view == 'overview' ? true : false} icon={faChartLine} setView={() => setView('overview')}/>
				<NavItem title="Expenses" selected={view == 'expenses' ? true : false} icon={faWallet} setView={() => setView('expenses')}/>
				<NavItem title="M8s" selected={view == 'm8s' ? true : false} icon={faUsers} setView={() => setView('m8s')}/>
			</ul>
		</nav>
	);
}

export default Nav;
