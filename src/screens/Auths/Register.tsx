import React from "react";
import {View, Text, StyleSheet } from "react-native";

export default function Register(){
    return(
        <View style={styles.container}>
            <Text> Venda Facil</Text>
            <Text> Crie sua conta</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})