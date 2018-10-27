import React from 'react';

import { Dimensions, View, Image, TouchableHighlight, Alert } from 'react-native';

import { Card, CardItem, Header, Thumbnail, H1, Content, Button, Text, Left, Right, Footer, FooterTab, Title, Icon, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Modal from "react-native-modal";

import LootRating from './LootRating';
import MapRedux from "../../redux/MapRedux";
import {connect} from "react-redux";


class PlaceInfoCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            visible: true,
        };
    }

    render() {
        const {height, width} = Dimensions.get('window');
        const {name, loot, picture} = this.props.navigation.state.params;

        const cardStyle = {
            backgroundColor: '#f5f5f5',
            alignSelf: 'center',
            margin: 0,
            width: width / 1.5,
            height: height / 2
        };

        console.log(this.props);

        return (
            <Modal visible={this.state.visible}>
                <Card style={cardStyle} transparent>
                    <CardItem>
                        <View>
                            <Text>{name}</Text>
                            <Text note>{loot}</Text>
                        </View>
                        <Right>
                            <Text>5 Stars!</Text>
                        </Right>
                    </CardItem>
                    <Grid>
                        <Row>
                            <Image source={{ uri: picture, height: '100%', width: '100%'}}/>
                        </Row>
                        <Row>
                            <View style={{margin: 10}}>
                                <Text note>Rate how good the candy was.</Text>
                            </View>
                            <LootRating setRating={(rating) => this.setState({rating: rating})}/>
                        </Row>
                    </Grid>
                    <Button block onPress={this._onConfirmRating}>
                        <Text>Confirm</Text>
                    </Button>
                </Card>
            </Modal>
        );
    }

    _onConfirmRating = () => {
        const { placeId } = this.props.navigation.state.params;
        this.props.setVotes(placeId, this.state.rating);
        this.props.navigation.goBack();
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setVotes: (placeId : String, votes : Number) => dispatch(MapRedux.setPlaceVotes(placeId, votes))
    };
};

export default connect(null, mapDispatchToProps)(PlaceInfoCard);
