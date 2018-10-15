import React from 'react';
import { View, Text } from 'react-native';
import UpdaterRedux from "../redux/UpdaterRedux";
import connect from "react-redux/es/connect/connect";

class UpdateStatus extends React.Component {
    render() {
        return (
            <Text>Updating: {this.props.updateStatus}</Text>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        updateStatus: state.Updater.updateStatus
    }
};

export default connect(mapStateToProps)(UpdateStatus);
