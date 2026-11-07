import React, { ReactNode, useState } from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors, radius, spacing, type } from '../theme';

interface Props extends TextInputProps {
    label?: string;
    Icon?: LucideIcon;
    // Elemento à direita do campo (ex: botão de mostrar senha).
    trailing?: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
}

// Campo de texto padrão do app: rótulo opcional acima, ícone à esquerda,
// borda que escurece quando o campo está em foco.
export const TextField = ({ label, Icon, trailing, containerStyle, multiline, style, onFocus, onBlur, ...rest }: Props) => {
    const [focused, setFocused] = useState(false);

    return (
        <View style={[styles.wrapper, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.field, multiline && styles.fieldMultiline, focused && styles.fieldFocused]}>
                {Icon && (
                    <Icon
                        size={18}
                        color={focused ? colors.ink : colors.inkFaint}
                        strokeWidth={2}
                        style={multiline ? styles.iconTop : undefined}
                    />
                )}
                <TextInput
                    placeholderTextColor={colors.inkFaint}
                    selectionColor={colors.ink}
                    cursorColor={colors.ink}
                    multiline={multiline}
                    textAlignVertical={multiline ? 'top' : 'center'}
                    onFocus={(e) => { setFocused(true); onFocus?.(e); }}
                    onBlur={(e) => { setFocused(false); onBlur?.(e); }}
                    style={[styles.input, multiline && styles.inputMultiline, style]}
                    {...rest}
                />
                {trailing}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.md,
    },

    label: {
        ...type.eyebrow,
        marginBottom: spacing.sm,
    },

    field: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.line,
        borderRadius: radius.md,
        borderCurve: 'continuous',
        paddingHorizontal: spacing.lg,
        minHeight: 54,
    },

    fieldMultiline: {
        alignItems: 'flex-start',
        minHeight: 120,
        paddingVertical: spacing.md,
    },

    fieldFocused: {
        borderColor: colors.ink,
    },

    iconTop: {
        marginTop: 2,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: colors.ink,
        paddingVertical: spacing.md,
    },

    inputMultiline: {
        paddingVertical: 0,
        minHeight: 96,
    },
});
