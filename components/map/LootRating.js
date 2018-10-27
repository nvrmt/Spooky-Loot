import React from 'react';

import { StyleSheet, Dimensions, View, Image, TouchableHighlight } from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';

import candy from '../../images/candy.png';

export default class LootRating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            personalRating: 0
        };

        this.candyRating = [];
    }

    render() {

        const cardStyle = {
            alignSelf: 'center',
            position: 'absolute',
            width: 200,
            left: 35
        };

        const candyStyle = {
            width: 40,
            height: 40,
            tintColor: '#000000',
            margin: 1,
            top: 7,
            alignSelf: 'center'
        };

        return (
            <View style={cardStyle}>
                <Grid>
                    <Col>
                        <TouchableHighlight underlayColor={'#fff'} onPress={() => this._onPress(0)}>
                            <Image ref={(ref) => this.candyRating[0] = ref} style={candyStyle} source={candy}/>
                        </TouchableHighlight>
                    </Col>
                    <Col>
                        <TouchableHighlight underlayColor={'#fff'} onPress={() => this._onPress(1)}>
                            <Image ref={(ref) => this.candyRating[1] = ref} style={candyStyle} source={candy}/>
                        </TouchableHighlight>
                    </Col>
                    <Col>
                        <TouchableHighlight underlayColor={'#fff'} onPress={() => this._onPress(2)}>
                            <Image ref={(ref) => this.candyRating[2] = ref} style={candyStyle} source={candy}/>
                        </TouchableHighlight>
                    </Col>
                    <Col>
                        <TouchableHighlight underlayColor={'#fff'} onPress={() => this._onPress(3)}>
                            <Image ref={(ref) => this.candyRating[3] = ref} style={candyStyle} source={candy}/>
                        </TouchableHighlight>
                    </Col>
                    <Col>
                        <TouchableHighlight underlayColor={'#fff'} onPress={() => this._onPress(4)}>
                            <Image ref={(ref) => this.candyRating[4] = ref} style={candyStyle} source={candy}/>
                        </TouchableHighlight>
                    </Col>
                </Grid>
            </View>
        );
    }

    _onPress = (idx) => {
        this.setState({personalRating: idx + 1});

        let count = 0;
        this.candyRating.map(rating => {
            if(idx >= count) {
                rating.setNativeProps({tintColor: null});
            } else {
                rating.setNativeProps({tintColor: '#000000'});
            }

            count++;
        });

        this.props.setRating(idx + 1);
    }
}
