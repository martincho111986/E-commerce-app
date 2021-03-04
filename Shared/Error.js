import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Text } from 'native-base';

const Error = (props) => {
    return (
        <View style={styles.container}>
            <Badge style={styles.container}>
            <Text style={styles.textError}>{props.message}</Text>
            </Badge>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        margin: 10
    },
    textError: {
        fontSize: 18
    }
})

export default Error;