import React from 'react';
import {StyleSheet, PermissionsAndroid, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import { Container, Card, CardItem, Header, H1, Content, Left, Right, Footer, FooterTab, Title, Icon, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


//Components
import Logo from "../components/Logo";
import UpdateStatus from "../components/Status";

import {styles} from "../styles";
import {getUpdateStatus} from "../redux/UpdaterRedux";


class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let requested = this.requestAndroidFineLocation();
    }

    //TODO create permissions manager... saga?
    async requestAndroidFineLocation() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Spooky Loot',
                    'message': 'Spooky Loot needs access to your location, as' +
                        'this is a map based app.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Permission to use gps granted.");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render () {
        const {height, width} = Dimensions.get('window');

        const cardStyle = {
            alignSelf: 'center',
            width: width / 1.5,
            height: height / 2.5
        };

        return (
            <Container style={styles.container}>
                <Content padder style={cardStyle}>
                    <Card enableEmptySections >
                        <Grid>
                            <Row size={25}>
                                <Logo />
                            </Row>
                            <Row size={75}>
                                <UpdateStatus header={"Status"} message={this.props.updateStatus} />
                            </Row>
                        </Grid>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        updateStatus: getUpdateStatus(state)
    }
};

export default connect(mapStateToProps, null)(SplashScreen);