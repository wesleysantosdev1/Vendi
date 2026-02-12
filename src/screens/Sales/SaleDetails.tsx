import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function SaleDetails(){
    return(
        <View style={styles.container}> 
            <Text> Detalhes da Venda</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})