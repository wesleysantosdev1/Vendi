import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface InputProps extends TextInputProps {
    Icon: LucideIcon;
}

export const InputVenda = ({ Icon, ...rest }: InputProps) => (
    <View style={styles.container}>
        <Icon size={20} color="#828489" strokeWidth={2} />
        <TextInput 
        style={styles.input} 
        placeholderTextColor="#828489"
        {...rest} 
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        paddingHorizontal: 15,
        height: 55,
        borderRadius: 12,
        marginBottom: 15,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#1A1A1A',
    }
});