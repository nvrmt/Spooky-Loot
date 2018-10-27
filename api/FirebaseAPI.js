import React from 'react';
import firebase from 'react-native-firebase';

/* Firestore functions */

export function updatePlace(place : Object) {
    const ref = firebase.firestore().collection('places').doc(place.placeId);

    ref.set({
        placeId: place.placeId,
        title: place.title,
        description: place.description,
        latlng: place.latlng,
        votes: place.votes
    }, {merge: true});
}


// also adds users
export function updateUser(user) {
    const { displayName, email, uid, metadata } = user.user;

    const ref = firebase.firestore().collection('users');

    ref.doc(uid).set({
        displayName: displayName,
        email: email,
        creationTime: metadata.creationTime,
        displayPicture: 1
    }, {merge: true});
}

export function loadUser(user) {
    const { uid } = user.user;

    const ref = firebase.firestore().collection('users');

    const doc = ref.doc(uid).get();
}