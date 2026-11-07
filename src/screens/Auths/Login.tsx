import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/types";

import { PasswordInput } from "../../components/PasswordInput";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { BrandMark } from "../../components/BrandMark";
import { loginRequest } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import { colors, spacing, type } from "../../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login(){
    const navigation = useNavigation<NavigationProp>();
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha e-mail e senha");
            return;
        }

        try {
            setLoading(true);
            const { user, token } = await loginRequest(email.trim(), password);
            await signIn(user, token);
        } catch (error: any) {
            Alert.alert(
                "Erro ao entrar",
                error.response?.data?.error || "Não foi possível fazer login"
            );
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
                    <BrandMark />

                    <View style={styles.hero}>
                        <Text style={styles.title}>Bom te ver{'\n'}de novo.</Text>
                        <Text style={styles.subtitle}>Entre para acompanhar suas vendas de hoje.</Text>
                    </View>

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
                        placeholder="Sua senha"
                        value={password}
                        onChangeText={setPassword}
                        autoComplete="password"
                    />

                    <Button
                        title="Entrar"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.button}
                    />

                    <Pressable
                        onPress={() => navigation.navigate('Register')}
                        style={styles.footer}
                        accessibilityRole="link"
                    >
                        <Text style={styles.footerText}>
                            Não tem conta? <Text style={styles.footerLink}>Criar conta</Text>
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
        paddingTop: spacing.xxxl,
        paddingBottom: spacing.xxl,
    },

    hero: {
        marginTop: spacing.xxxl * 1.5,
        marginBottom: spacing.xxxl,
    },

    title: {
        ...type.title,
        fontSize: 36,
        lineHeight: 40,
        letterSpacing: -1,
    },

    subtitle: {
        ...type.body,
        color: colors.inkSoft,
        marginTop: spacing.md,
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
