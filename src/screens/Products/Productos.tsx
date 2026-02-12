import React from "react";
import { View, Text, StyleSheet } from "react-native"; 

export default function Productos(){
    return(
        <View style={styles.container}> 
            <Text> Produtos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})