import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function AddSales(){
    return(
        <View style={styles.container}>
            <Text> Nova venda </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    }
})