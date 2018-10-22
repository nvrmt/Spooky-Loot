import React from 'react';
import firebase from 'react-native-firebase';

/* Firestore functions */

// adds 'new' user information to the database (not same as registering)
export function addUser(user) {
    const { profile } = user.additionalUserInfo;

    let userCol = firebase.firestore().collection('users');
    return userCol.add({email: profile.email});
}

export function addPlace(placeId) {
    let placeCol = firebase.firestore().collection('places');
    return placeCol.add({placeId: placeId});
}
