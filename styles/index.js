import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#f36700',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    rootContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fa001e',
        alignItems: 'center',
    },
    logo: {
        marginBottom: 20,
        alignSelf:'center'
    }
});

export const AuthStyles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#f36700',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButton: {
        backgroundColor: '#485efa',
        alignSelf: 'center'
    }
});


export const MapStyles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#f36700',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});