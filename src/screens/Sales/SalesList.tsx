import React from "react";
import {View, Text, StyleSheet } from 'react-native';

export default function SalesList(){
    return(
        <View style={styles.container}>
            <Text> Vendas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    }
})