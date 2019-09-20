import React, { Component } from "react";
import AddGroup from "../../Components/Group/AddGroup/AddGroup";
import GroupList from "../../Components/Group/GroupList/GroupList";
import axios from "../../axios-instance";
import ViewGroup from "../../Components/Group/ViewGroup/ViewGroup";

class Group extends Component {
	state = {
		groups: [],
		selectedGroup: null,
		showArea: "list",
		categories: []
	};

	componentDidMount() {
		this.getGroups();
		this.getCategories();
	}

	getGroups = async () => {
		const res = await axios.get("group/index.php?action=getGroups");

        if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				console.log('grouos', data);
				this.setState({ groups: data });
			}
		}
	};

	getCategories = async () => {
		const res = await axios.get("category/index.php?action=getCategories");

		if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				this.setState({ categories: data });
			}
		}
	};

	addMateToGroup = mate => {

		// add mate to the selected group
		const selectedGroup = this.state.selectedGroup;
		selectedGroup.users.push(mate);

		// update the groups state
		const groups = this.state.groups.map(group => {
			if (group.id === selectedGroup.id) {
				return selectedGroup;
			}
			return group;
		})
		
		this.setState({
			groups: groups,
			selectedGroup: selectedGroup
		})

	}

	showArea = area => {
		this.setState({ showArea: area });
	};

	groupSelected = selectedGroup => {
		this.setState({ showArea: "view", selectedGroup });
	};

	addGroup = group => {
		let groups = null;
		if (this.state.groups.length) {
			groups = [...this.state.groups, group];
		} else {
			groups = [group];
		}
		this.setState({ groups: groups});
	}

	render() {
		let render = <GroupList groups={this.state.groups} showArea={this.showArea} groupSelected={this.groupSelected} />;

		if (this.state.showArea == "add") {
			render = <AddGroup showArea={this.showArea} addGroup={this.addGroup} />;
		}

		if (this.state.showArea == "view") {
			render = <ViewGroup group={this.state.selectedGroup} showArea={this.showArea} categories={this.state.categories} addMateToGroup={this.addMateToGroup} {...this.props}/>;
		}

		return <>{render}</>;
	}
}

export default Group;
