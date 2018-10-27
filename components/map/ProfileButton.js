import React from 'react';

import { StyleSheet, Dimensions, View } from 'react-native';

import { Container, Card, CardItem, Header, Thumbnail, H1, Content, Button, Text, Left, Right, Footer, FooterTab, Title, Icon, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { DISPLAY_PICTURES } from "../../constants";

export default class ProfileButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {height, width} = Dimensions.get('window');

        const cardStyle = {
            alignSelf: 'center',
            position: 'absolute',
            top: 5,
            left: 5
        };

        return (
            <Card style={cardStyle} transparent>
                <Thumbnail square source={this.getProperPicture()}/>
            </Card>
        );
    }

    getProperPicture() {
        switch(this.props.displayPicture) {
            case 1: return DISPLAY_PICTURES.PANDA;
            case 2: return DISPLAY_PICTURES.NARWHAL;
            case 3: return DISPLAY_PICTURES.PIG;
            case 4: return DISPLAY_PICTURES.SLOTH;
            case 5: return DISPLAY_PICTURES.SNAKE;
            default: return DISPLAY_PICTURES.WALRUS;
        }
    }
}
