import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Lock, Eye, EyeOff } from 'lucide-react-native';

interface Props {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    // 'password' no login (gerenciador de senhas preenche a senha salva),
    // 'new-password' no cadastro (gerenciador sugere uma senha nova).
    autoComplete?: 'password' | 'new-password';
}

// Campo de senha com botão de olho para mostrar/ocultar o que foi digitado.
// Cada campo controla a própria visibilidade e começa sempre oculto.
export const PasswordInput = ({ placeholder, value, onChangeText, autoComplete = 'password' }: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Lock size={20} color="#000" />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#000"
                secureTextEntry={!visible}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete={autoComplete}
                style={styles.input}
            />
            <TouchableOpacity
                onPress={() => setVisible(current => !current)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                accessibilityRole="button"
                accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
            >
                {visible ? <EyeOff size={20} color="#828489" /> : <Eye size={20} color="#828489" />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#CDCED0',
        marginBottom: 16,
        alignItems: 'center',
        paddingHorizontal: 22,
        height: 48,
        borderRadius: 10,
        marginHorizontal: 20,
    },

    input: {
        flex: 1,
        marginLeft: 8,
        color: '#000',
    },
});
