import React, { useState } from 'react';
import { StyleSheet, Alert, Linking } from 'react-native';
import { User, Mail, Phone, MessageSquare, MessageCircle } from 'lucide-react-native';
import { BottomSheet } from '../../../components/BottomSheet';
import { TextField } from '../../../components/TextField';
import { Button } from '../../../components/Button';
import { spacing } from '../../../theme';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const SupportModal = ({ visible, onClose }: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [message, setMessage] = useState('');

    const handleSendWhatsApp = () => {
        if (!name || !message) {
            Alert.alert("Campos obrigatórios", "Por favor, informe seu nome e a descrição do problema.");
            return;
        }

        const supportNumber = "5585999295091";

        const finalMessage = `*Novo Ticket de Suporte VendaFácil*\n\n*Nome:* ${name}\n*E-mail:* ${email || 'Não informado'}\n*Telefone:* ${phoneInput || 'Não informado'}\n\n*Descrição do Problema:*\n${message}`;

        const url = `whatsapp://send?phone=${supportNumber}&text=${encodeURIComponent(finalMessage)}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    const webUrl = `https://wa.me/${supportNumber}?text=${encodeURIComponent(finalMessage)}`;
                    return Linking.openURL(webUrl);
                }
            })
            .catch((error) => {
                console.error("Erro ao abrir WhatsApp", error)
                Alert.alert("Erro", "Não foi possível abrir o WhatsApp.")
            })
            .finally(() => {
                setName(''); setEmail(''); setPhoneInput(''); setMessage('');
                onClose();
            });
    };

    return (
        <BottomSheet
            visible={visible}
            onClose={onClose}
            title="Fale com o suporte"
            description="Conte o que aconteceu e a gente responde pelo WhatsApp."
        >
            <TextField Icon={User} placeholder="Seu nome" value={name} onChangeText={setName} />
            <TextField
                Icon={Mail}
                placeholder="Seu e-mail (opcional)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextField
                Icon={Phone}
                placeholder="Seu telefone (opcional)"
                value={phoneInput}
                onChangeText={setPhoneInput}
                keyboardType="phone-pad"
            />
            <TextField
                Icon={MessageSquare}
                placeholder="Descreva o que aconteceu..."
                value={message}
                onChangeText={setMessage}
                multiline
            />

            <Button
                title="Enviar pelo WhatsApp"
                Icon={MessageCircle}
                onPress={handleSendWhatsApp}
                style={styles.button}
            />
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: spacing.sm,
    },
});
