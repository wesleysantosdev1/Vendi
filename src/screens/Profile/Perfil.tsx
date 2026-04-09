import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { User, LifeBuoy, LogOut } from 'lucide-react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from '../../services/api';

import { StatCard, MenuItem } from './components/ProfileComponents';
import { SupportModal } from './components/SupportModal'; 
import { EditProfileModal } from './components/EditProfileModal';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function ProfileScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [editModal, setEditModal] = useState(false);
    const [supportModal, setSupportModal] = useState(false);

    const [userData, setUserData] = useState({ name: '', email: ''});
    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {
        try {
            const response = await api.get('/users/me');
            setUserData({
                name: response.data.name,
                email: response.data.email
            });
        } catch (error) {
            console.log("Erro ao carregar perfil", error)
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadProfile();
        }, [])
    );

    const getInitials = (name: string) => {
        if (!name) return '??';
        const names = name.trim().split(' ');

        if (names.length >= 2) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };


    return (
        <SafeAreaProvider style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <ActivityIndicator size="large" color="#4963E4" style={{ marginTop: 50}} />
                ) : (
                    <>
                        <View style={styles.header}>
                            <View style={styles.avatarContainer}>
                                <Text style={styles.avatarText}>{getInitials(userData.name)}</Text>
                            </View>
                            <Text style={styles.userName}>{userData.name}</Text>
                            <Text style={styles.userEmail}>{userData.email}</Text>
                        </View>

                        <View style={styles.statsRow}>
                            <StatCard label="Vendas" value={142} />
                            <StatCard label="Produtos" value={5} />
                            <StatCard label="Clientes" value={38} />
                        </View>

                        <View style={styles.menuSection}>
                            <MenuItem 
                                Icon={User} 
                                label="Dados pessoais" 
                                onPress={() => setEditModal(true)} 
                            />

                            <MenuItem 
                                Icon={LifeBuoy} 
                                label="Suporte" 
                                onPress={() => setSupportModal(true)} 
                            />
                        </View>

                        <TouchableOpacity 
                            style={styles.logoutBtn} 
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <LogOut size={20} color="#EF4444" />
                            <Text style={styles.logoutText}>Sair da conta</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>

            <EditProfileModal 
                visible={editModal} 
                onClose={() => {setEditModal(false); loadProfile(); }} 
                initialData={userData}
            />

            <SupportModal 
                visible={supportModal} 
                onClose={() => setSupportModal(false)} 
            />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safe: { 
        flex: 1, 
        backgroundColor: '#F8F9FA' 
    },

    container: { 
        padding: 20, 
        paddingBottom: 100 
    },

    header: { 
        alignItems: 'center', 
        marginTop: 20, 
        marginBottom: 30 
    },

    avatarContainer: { 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        backgroundColor: '#EBEFFF', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 15 
    },

    avatarText: { 
        fontSize: 32, 
        fontWeight: 'bold', 
        color: '#4963E4' 
    },

    userName: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#051D3B' 
    },

    userEmail: { 
        fontSize: 14, 
        color: '#828489', 
        marginTop: 4 
    },

    statsRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 30 
    },

    menuSection: { 
        marginBottom: 20 
    },

    logoutBtn: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 18, 
        borderRadius: 16, 
        borderWidth: 1, 
        borderColor: '#FEE2E2', 
        backgroundColor: '#FFF' 
    },

    logoutText: { 
        marginLeft: 10, 
        color: '#EF4444', 
        fontWeight: 'bold', 
        fontSize: 15 
    }
});