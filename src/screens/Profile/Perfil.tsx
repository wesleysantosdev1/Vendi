import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { User, LifeBuoy, LogOut } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import formatDateTime from '../../utils/date';

import { StatCard, MenuItem } from './components/ProfileComponents';
import { SupportModal } from './components/SupportModal';
import { EditProfileModal } from './components/EditProfileModal';
import { ScreenHeader } from '../../components/ScreenHeader';
import { colors, spacing, radius, type } from '../../theme';
import { logError } from "../../utils/logError";


export default function ProfileScreen() {
    const { signOut } = useAuth();
    const [editModal, setEditModal] = useState(false);
    const [supportModal, setSupportModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        stats: { sales: 0, products: 0, clients: 0 }
    });

    const loadProfile = async () => {
        try {
            const response = await api.get('/users/me');
            setUserData({
                name: response.data.name,
                email: response.data.email,
                stats: response.data.stats
            });
        } catch (error) {
            logError("Erro ao carregar perfil", error)
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
        <SafeAreaView style={styles.safe} edges={['top']}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <ScreenHeader title="Perfil" />

                <View style={styles.content}>
                    {loading ? (
                        <ActivityIndicator color={colors.ink} style={styles.loading} />
                    ) : (
                        <>
                            <View style={styles.identity}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{getInitials(userData.name)}</Text>
                                </View>
                                <View style={styles.identityTexts}>
                                    <Text style={styles.userName} numberOfLines={1}>{userData.name}</Text>
                                    <Text style={styles.userEmail} numberOfLines={1}>{userData.email}</Text>
                                </View>
                            </View>

                            <View style={styles.group}>
                                <View style={styles.statsRow}>
                                    <StatCard label="Vendas" value={userData.stats?.sales || 0} />
                                    <View style={styles.statsDivider} />
                                    <StatCard label="Produtos" value={userData.stats?.products || 0} />
                                    <View style={styles.statsDivider} />
                                    <StatCard label="Clientes" value={userData.stats?.clients || 0} />
                                </View>
                            </View>

                            <Text style={styles.sectionTitle}>Conta</Text>
                            <View style={styles.group}>
                                <MenuItem
                                    Icon={User}
                                    label="Dados pessoais"
                                    onPress={() => setEditModal(true)}
                                />
                                <MenuItem
                                    Icon={LifeBuoy}
                                    label="Suporte"
                                    onPress={() => setSupportModal(true)}
                                    last
                                />
                            </View>

                            <View style={[styles.group, styles.logoutGroup]}>
                                <MenuItem
                                    Icon={LogOut}
                                    label="Sair da conta"
                                    tone="danger"
                                    onPress={() => signOut()}
                                    last
                                />
                            </View>
                        </>
                    )}

                    <Text style={styles.versionText}>{getVersionLabel()}</Text>
                </View>
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
        </SafeAreaView>
    );
}

// Mostra qual código JS está rodando: o embutido no build ou um update OTA
// (com a data de publicação). Serve pra confirmar se um update chegou no celular.
function getVersionLabel() {
    if (__DEV__) {
        return 'Versão de desenvolvimento';
    }
    if (!Updates.isEnabled || Updates.isEmbeddedLaunch || !Updates.createdAt) {
        return `Versão do build${Updates.channel ? ` · ${Updates.channel}` : ''}`;
    }
    return `Atualização de ${formatDateTime(Updates.createdAt.toISOString())}${Updates.channel ? ` · ${Updates.channel}` : ''}`;
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.paper,
    },

    container: {
        paddingBottom: spacing.xxxl,
    },

    content: {
        paddingHorizontal: spacing.xl,
    },

    loading: {
        marginTop: spacing.xxxl,
    },

    identity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
        marginBottom: spacing.xl,
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: radius.lg + 4,
        borderCurve: 'continuous',
        backgroundColor: colors.ink,
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarText: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.lime,
        letterSpacing: -0.5,
    },

    identityTexts: {
        flex: 1,
    },

    userName: {
        ...type.heading,
    },

    userEmail: {
        ...type.caption,
        marginTop: 2,
    },

    group: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        overflow: 'hidden',
    },

    statsRow: {
        flexDirection: 'row',
    },

    statsDivider: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: colors.line,
        marginVertical: spacing.md,
    },

    sectionTitle: {
        ...type.eyebrow,
        marginTop: spacing.xxl,
        marginBottom: spacing.sm,
    },

    logoutGroup: {
        marginTop: spacing.md,
    },

    versionText: {
        ...type.caption,
        fontSize: 12,
        color: colors.inkFaint,
        textAlign: 'center',
        marginTop: spacing.xxl,
    },
});
