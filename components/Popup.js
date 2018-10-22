import React from 'react';

import { StyleSheet, Dimensions } from 'react-native';

import { Container, Card, CardItem, Header, H1, Content, Button, Text, Left, Right, Footer, FooterTab, Title, Icon, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';



export default class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {visible: false};
    }

    render() {
        const {height, width} = Dimensions.get('window');

        const cardStyle = {
            alignSelf: 'center',
            width: width / 1.5,
            height: height / 2.5
        };

        return (
            this.state.visible &&
            (<Card style={cardStyle}>
                <Text style={{textAlign: 'center'}}>
                    {this.props.popupHeader || "Header Text"}
                </Text>
                <Grid>
                    <Col style={{ backgroundColor: '#f0f0f0', height: 200 }}>
                        <Text style={{textAlign: 'center', marginTop: 10}}>
                            {this.props.popupBody || "Header Text"}
                        </Text>
                    </Col>
                </Grid>
                <Button block onPress={this.onPress}>
                    <Text>Continue</Text>
                </Button>
            </Card>)
        );

    }

    togglePopup() {
        this.setState({visible: !this.state.visible});
    }


    onPress = () => {
        this.togglePopup(); // hides the component
        this.props.onPress(); // calls the onPress bound to the parent
    }
}
