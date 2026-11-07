import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, User, ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/types";

import { PasswordInput } from "../../components/PasswordInput";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { BrandMark } from "../../components/BrandMark";
import { registerRequest } from "../../services/authService";
import { colors, spacing, radius, type, hitSlop } from "../../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register(){
    const navigation = useNavigation<NavigationProp>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        try {
            setLoading(true);
            await registerRequest(name.trim(), email.trim(), password);
            Alert.alert("Sucesso", "Conta criada com sucesso!");
            navigation.navigate("Login");
        } catch (error: any) {
            console.log("Erro ao criar conta:", error.response?.status);
            Alert.alert("Erro", error.response?.data?.error || "Erro ao criar conta");
        } finally {
            setLoading(false);
        }
    }

    return(
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.topRow}>
                        <Pressable
                            onPress={() => navigation.navigate('Login')}
                            hitSlop={hitSlop}
                            accessibilityRole="button"
                            accessibilityLabel="Voltar ao login"
                            style={styles.back}
                        >
                            <ArrowLeft size={20} color={colors.ink} strokeWidth={2.25} />
                        </Pressable>
                        <BrandMark />
                    </View>

                    <View style={styles.hero}>
                        <Text style={styles.title}>Crie sua conta.</Text>
                        <Text style={styles.subtitle}>Leva menos de um minuto.</Text>
                    </View>

                    <TextField
                        label="Nome completo"
                        Icon={User}
                        placeholder="Como você se chama?"
                        value={name}
                        onChangeText={setName}
                        autoComplete="name"
                    />

                    <TextField
                        label="E-mail"
                        Icon={Mail}
                        placeholder="voce@email.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                    />

                    <PasswordInput
                        label="Senha"
                        placeholder="Crie uma senha"
                        value={password}
                        onChangeText={setPassword}
                        autoComplete="new-password"
                    />

                    <PasswordInput
                        label="Confirmar senha"
                        placeholder="Repita a senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        autoComplete="new-password"
                    />

                    <Button
                        title="Criar conta"
                        onPress={handleRegister}
                        loading={loading}
                        style={styles.button}
                    />

                    <Pressable
                        onPress={() => navigation.navigate('Login')}
                        style={styles.footer}
                        accessibilityRole="link"
                    >
                        <Text style={styles.footerText}>
                            Já tem uma conta? <Text style={styles.footerLink}>Entrar</Text>
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.paper,
    },

    flex: {
        flex: 1,
    },

    container: {
        flexGrow: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        paddingBottom: spacing.xxl,
    },

    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
    },

    back: {
        width: 40,
        height: 40,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: 'center',
        justifyContent: 'center',
    },

    hero: {
        marginTop: spacing.xxxl,
        marginBottom: spacing.xxl,
    },

    title: {
        ...type.title,
        fontSize: 34,
        letterSpacing: -1,
    },

    subtitle: {
        ...type.body,
        color: colors.inkSoft,
        marginTop: spacing.sm,
    },

    button: {
        marginTop: spacing.md,
    },

    footer: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },

    footerText: {
        ...type.body,
        color: colors.inkSoft,
    },

    footerLink: {
        color: colors.ink,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});
