import React from "react";
import {View, Text, StyleSheet, Image, TextInput, Platform, TouchableOpacity } from "react-native";
import { Mail, Lock, User, ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Register(){

    type NavigationProp = NativeStackNavigationProp<
        RootStackParamList,
        'Login'
    >

    const navigation = useNavigation<NavigationProp>();

    return(
        <View style={styles.container}>
            <View style={styles.ViewImage}>
                <Image 
                    source={require("./assets/logoDindin.png")} 
                    style={styles.imageLogo}
                />
                <Text style={styles.Text1}> VendaFácil</Text>
                <Text style={styles.Text2}> Crie sua conta</Text>
            </View>

            <View style={styles.viewBack}>
                <TouchableOpacity 
                    style={styles.Buttonback} 
                    onPress={() => navigation.navigate('Login')}
                > 
                    <ArrowLeft size={20} color="#888" />
                    <Text style={styles.Text5}>Voltar ao login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewInputs}>
                <User size={20} color="#888" />
                <TextInput 
                placeholder="Nome completo"
                style={styles.Inputs}
                />
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

            <View style={styles.viewInputs}>
                <Lock size={20} color="#888" />
                <TextInput 
                placeholder="Confirmar senha"
                style={styles.Inputs}
                />
            </View>

            <View style={styles.viewButton}>
                <TouchableOpacity 
                onPress={() => navigation.navigate("Home")}
                style={styles.button}>
                    <Text style={styles.Text3}>Criar conta</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewRegister}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.Text4}>Já tem uma conta? Faça login</Text>
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

    Buttonback: {
        flexDirection: 'row'
    },

    Text5: {
        color: '#888'
    },

    viewBack: {
        flexDirection: 'row',
        marginBottom: 8, 
        alignItems: 'center', 
        marginHorizontal: 20,
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
        marginLeft: 8,
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
    },
})