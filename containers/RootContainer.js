import React from 'react';
import { connect } from 'react-redux';

import ReduxNavigation from '../navigation/ReduxNavigation';
import InitRedux from '../redux/StartupRedux';

class RootContainer extends React.Component {
	componentDidMount() {
		this.props.startAppInit();
	}

	render() {
		return <ReduxNavigation />;
	}
}


const mapDispatchToProps = dispatch => {
	return {
		startAppInit: (payload) => dispatch(InitRedux.startupRequest(payload))
	};
};

export default connect(null, mapDispatchToProps)(RootContainer);
