import React from "react";
import {View, Text, StyleSheet, Image, Platform, TextInput, TouchableOpacity } from "react-native";
import { Mail, Lock } from "lucide-react-native";

export default function Login(){
    return(
        <View style={styles.container}>
            <View style={styles.ViewImage}>
                <Image 
                    source={require("./assets/logoDindin.png")} 
                    style={styles.imageLogo}
                />
                <Text style={styles.Text1}> VendaFácil</Text>
                <Text style={styles.Text2}> Faça  login para continuar</Text>
            </View>

            <View style={styles.viewInputs}>
                <Mail size={20} color="#888" />
                <TextInput 
                placeholder="E-mail"
                style={styles.Inputs}
                />
            </View>

            <View style={styles.viewInputs}>
                <Lock size={20} color="#888" />
                <TextInput 
                placeholder="Senha"
                style={styles.Inputs}
                />
            </View>

            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.Text3}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewRegister}>
                <TouchableOpacity>
                    <Text style={styles.Text4}>Não tem conta? Criar conta</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 

    ViewImage: {
        paddingTop: 70, 
        alignItems: 'center', 
        paddingBottom: 20
    }, 

    imageLogo: {
        width: 80, 
        height: 80,
        marginBottom: 10
    },

    Text1: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginLeft: -10,
        marginBottom: 5
    }, 

    Text2: {
        color: '#828489',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto'
    }, 

    viewInputs: {
        flexDirection: 'row',
        backgroundColor: '#CDCED0', 

        marginBottom: 16, 
        alignItems: 'center', 
        paddingHorizontal: 22,
        height: 48,
        borderRadius: 10,
        marginHorizontal: 20, 
    },

    Inputs: {
        
    }, 

    viewButton: {
        alignItems: 'center', 
        paddingTop: 10
    }, 

    button: {
        backgroundColor: '#4963E4', 
        width: 350, 
        height: 38, 
        borderRadius: 10, 
    }, 

    Text3: {
        alignSelf: 'center', 
        fontSize: 15,
        marginTop: 8,
        color: '#fff', 
        fontWeight: 'bold'
    }, 

    viewRegister: {
        alignItems: 'center', 
        paddingTop: 15,
    }, 

    Text4: {
        color: '#4963E4'
    }
})