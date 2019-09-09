import React, { Component } from 'react';
import AddGroup from '../../Components/Group/AddGroup/AddGroup';
import GroupList from '../../Components/GroupList/GroupList';
import axios from 'axios';
import ViewGroup from '../../Components/Group/ViewGroup/ViewGroup';

class Group extends Component {

    state = {
        groups: [],
        selectedGroup: null,
        showArea: 'list'
    }


    componentDidMount() {
        this.getGroups();
    }

    getGroups = async () => {

        const res = await axios.get("http://housem8.local/api/group/index.php?action=getGroups&user_id=" + 7);
        const { data, success, message } = res.data;

        if (success) {
            this.setState({ groups: data });
        }
    }

    showArea = area => {
        this.setState({showArea: area});
    }

    groupSelected = selectedGroup => {
        this.setState({showArea: 'view', selectedGroup});
    }

    render() {


        let render = <GroupList groups={this.state.groups} showArea={this.showArea} groupSelected={this.groupSelected} />

        if (this.state.showArea == 'add') {
            render = <AddGroup  showArea={this.showArea} />;
        }

        if (this.state.showArea == 'view') {
            render = <ViewGroup  group={this.state.selectedGroup} showArea={this.showArea} />;
        }

        return(
            <>
                {render}
            </>
        );
    }
}

export default Group;