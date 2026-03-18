import React, {useState} from "react";
import {View, Text, StyleSheet, Image, TextInput, Platform, TouchableOpacity } from "react-native";
import { Mail, Lock, User, ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { registerRequest } from "../../services/authService";

export default function Register(){

    type NavigationProp = NativeStackNavigationProp<
        RootStackParamList,
        'Login'
    >

    const navigation = useNavigation<NavigationProp>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleRegister() {
        try {
            if (!name || !email || !password || !confirmPassword) {
                alert("Preencha todos os campos");
                return;
            }

            if (password !== confirmPassword) {
                alert("As senhas não coincidem");
                return;
            }

            await registerRequest(name, email, password);

            alert("Conta criada com sucesso!");

            navigation.navigate("Login");

        } catch (error: any) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.error ||
                "Erro ao criar conta"
            );
        }
    }

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
                <User size={20} color="#000" />
                <TextInput 
                placeholderTextColor="#000"
                placeholder="Nome completo"
                style={styles.Inputs}
                value={name}
                onChangeText={setName}
                />
            </View>

            <View style={styles.viewInputs}>
                <Mail size={20} color="#000" />
                <TextInput 
                placeholderTextColor="#000"
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                style={styles.Inputs}
                />
            </View>

            <View style={styles.viewInputs}>
                <Lock size={20} color="#000" />
                <TextInput 
                placeholderTextColor="#000"
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.Inputs}
                />
            </View>

            <View style={styles.viewInputs}>
                <Lock size={20} color="#000" />
                <TextInput 
                placeholderTextColor="#000"
                placeholder="Confirmar senha"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.Inputs}
                />
            </View>

            <View style={styles.viewButton}>
                <TouchableOpacity 
                onPress={handleRegister}
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