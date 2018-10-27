import React from 'react';
import axios from 'axios';

export const GOOGLE_API_KEY = 'AIzaSyCrU0KdJE3KYLNaL8egYxwm921lCXAivf0';
const GOOGLE_PLACES_DETAILS_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/details/json?';
const GOOGLE_PLACES_SEARCH_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?';


/*     Places API     */
export function getPlacesByName(placeName) {
	return axios.get(GOOGLE_PLACES_SEARCH_ENDPOINT, {
		params: {
			key: GOOGLE_API_KEY,
			input: placeName,
			inputtype: 'textquery',
            fields: "photo,formatted_address,id,name,place_id,geometry,type"
		}
	});
}

export function getPlaceByID(placeId) {
	return axios.get(GOOGLE_PLACES_DETAILS_ENDPOINT, {
		params: {
			key: GOOGLE_API_KEY,
			placeid: placeId,
            fields: "photo,formatted_address,id,name,place_id,geometry,type"
		}
	});
}

/*     Geocoding API     */
const GOOGLE_GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json?';

export function getAddressFromCoord(lat, lng) {
	return axios.get(GOOGLE_GEOCODE_ENDPOINT, {
		params: {
			key: GOOGLE_API_KEY,
			latlng: lat + ',' + lng
		}
	});
}

export function getCoordFromAddress(address) {
	return axios.get(GOOGLE_GEOCODE_ENDPOINT, {
		params: {
			key: GOOGLE_API_KEY,
			address: address
		}
	});
}