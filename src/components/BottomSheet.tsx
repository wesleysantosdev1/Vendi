import React, { ReactNode } from 'react';
import { Modal, View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { colors, spacing, radius, type, hitSlop } from '../theme';

interface Props {
    visible: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: ReactNode;
}

// Painel que sobe de baixo, usado para formulários curtos, escolhas e confirmações.
// Tocar fora do painel ou no X fecha.
export const BottomSheet = ({ visible, onClose, title, description, children }: Props) => (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent onRequestClose={onClose}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.overlay}
        >
            <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Fechar" />

            <View style={styles.sheet}>
                <View style={styles.handle} />

                <View style={styles.header}>
                    <Text style={styles.title} accessibilityRole="header">{title}</Text>
                    <Pressable
                        onPress={onClose}
                        hitSlop={hitSlop}
                        accessibilityRole="button"
                        accessibilityLabel="Fechar"
                        style={styles.close}
                    >
                        <X size={18} color={colors.ink} strokeWidth={2.25} />
                    </Pressable>
                </View>

                {description && <Text style={styles.description}>{description}</Text>}

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.body}
                >
                    {children}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    </Modal>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.overlay,
    },

    backdrop: {
        ...StyleSheet.absoluteFill,
    },

    sheet: {
        backgroundColor: colors.paper,
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        borderCurve: 'continuous',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.sm,
        maxHeight: '88%',
    },

    handle: {
        alignSelf: 'center',
        width: 40,
        height: 4,
        borderRadius: radius.full,
        backgroundColor: colors.line,
        marginBottom: spacing.lg,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },

    title: {
        ...type.heading,
        flex: 1,
    },

    close: {
        width: 32,
        height: 32,
        borderRadius: radius.full,
        backgroundColor: colors.sunken,
        alignItems: 'center',
        justifyContent: 'center',
    },

    description: {
        ...type.caption,
        lineHeight: 19,
        marginBottom: spacing.sm,
    },

    body: {
        paddingTop: spacing.md,
        paddingBottom: spacing.xxxl + spacing.lg,
    },
});
