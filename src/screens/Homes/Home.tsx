import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen(){
    return (
        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <Text style={styles.text1}> Ola, Wesley!👋</Text>
                <Text> Quarta-feira, 11 de Fevereiro</Text>
            </View>

            <View style={styles.viewLucros}>
                <View style={styles.viewLucro}>
                    <Text>Hoje</Text>
                    <Text style={styles.textHoje} >R$ 450</Text>
                </View>

                <View style={styles.viewLucro}>
                    <Text>Semana</Text>
                    <Text style={styles.textSemana}>R$ 750</Text>
                </View>

                <View style={styles.viewLucro}>
                    <Text>Mês</Text>
                    <Text style={styles.textMes}>R$ 1750</Text>
                </View>
            </View>

            <View style={styles.cardVendas}>
                <View style={styles.iconeUp}>
                    <Text style={styles.testUp}> S </Text>
                </View>

                <View style={styles.totalVendas}>
                    <Text style={styles.textVendas}> Total de vendas realizadas </Text>
                    <Text style={styles.textNumber}> 142</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingTop: 25,
        paddingLeft: 15, 
        paddingRight: 15, 
    }, 

    viewHeader: {
        paddingTop: 2, 
        paddingLeft: 5
    }, 

    text1: {
        fontSize: 18, 
        fontWeight: 'bold',
    },

    viewLucros: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingTop: 20, 
        marginBottom: 25
    }, 

    viewLucro: {
        backgroundColor: '#fff', 
        marginLeft: 10, 
        width: 110, 
        height: 60, 
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center', 
    }, 

    textHoje: {
        color: '#3653E2',
        fontWeight: 'bold',
    }, 

    textSemana: {
        color: '#21C45D',
        fontWeight: 'bold',
    }, 

    textMes: {
        color: '#F59F0A',
        fontWeight: 'bold',
    }, 

    cardVendas: {
        backgroundColor: '#3753E2',
        flexDirection: 'row', 
        width: "100%", 
        height: 80,
        borderRadius: 10, 
        paddingLeft: 20,
        alignItems: 'center', 
    }, 

    iconeUp: {
        backgroundColor: "#6279E9",
        width: 40, 
        height: 40,
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 

    testUp: {
        color: '#fff', 
        fontWeight: 'bold', 
    }, 

    totalVendas: {
        paddingLeft: 20
    }, 

    textVendas: {
        color: '#fff', 
    }, 

    textNumber: {
        color: '#fff', 
        fontWeight: 'bold',
        fontSize: 20
    }
})