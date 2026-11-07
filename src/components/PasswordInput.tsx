import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Lock, Eye, EyeOff } from 'lucide-react-native';
import { TextField } from './TextField';
import { colors, hitSlop } from '../theme';

interface Props {
    label?: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    // 'password' no login (gerenciador de senhas preenche a senha salva),
    // 'new-password' no cadastro (gerenciador sugere uma senha nova).
    autoComplete?: 'password' | 'new-password';
}

// Campo de senha com botão de olho para mostrar/ocultar o que foi digitado.
// Cada campo controla a própria visibilidade e começa sempre oculto.
export const PasswordInput = ({ label, placeholder, value, onChangeText, autoComplete = 'password' }: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <TextField
            label={label}
            Icon={Lock}
            placeholder={placeholder}
            secureTextEntry={!visible}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete={autoComplete}
            trailing={
                <Pressable
                    onPress={() => setVisible(current => !current)}
                    hitSlop={hitSlop}
                    accessibilityRole="button"
                    accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
                >
                    {visible
                        ? <EyeOff size={20} color={colors.inkSoft} />
                        : <Eye size={20} color={colors.inkSoft} />}
                </Pressable>
            }
        />
    );
};
