import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Linking } from 'react-native';
import { X, User, Mail, Phone, MessageSquare } from 'lucide-react-native';

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
        <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.overlay}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Fale com o Suporte</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <X size={24} color="#828489" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.description}>Preencha os dados abaixo e te responderemos pelo WhatsApp.</Text>

                    <View style={styles.inputContainer}>
                        <User size={20} color="#828489" style={styles.inputIcon} />
                        <TextInput placeholder="Seu nome" style={styles.input} value={name} onChangeText={setName} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Mail size={20} color="#828489" style={styles.inputIcon} />
                        <TextInput placeholder="Seu e-mail" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    </View>

                    <View style={styles.inputContainer}>
                        <Phone size={20} color="#828489" style={styles.inputIcon} />
                        <TextInput placeholder="Seu telefone" style={styles.input} value={phoneInput} onChangeText={setPhoneInput} keyboardType="phone-pad" />
                    </View>

                    <View style={[styles.inputContainer, styles.textAreaContainer]}>
                        <MessageSquare size={20} color="#828489" style={[styles.inputIcon, { marginTop: 12 }]} />
                        <TextInput 
                        placeholder="Descreva o que aconteceu..." 
                        style={[styles.input, styles.textArea]} 
                        value={message} 
                        onChangeText={setMessage} 
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                        />
                    </View>

                    <TouchableOpacity style={styles.btnBtnSuccess} onPress={handleSendWhatsApp}>
                        <Text style={styles.btnText}>Enviar para WhatsApp</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.6)', 
        justifyContent: 'flex-end' 
    },

    content: { 
        backgroundColor: '#FFF', 
        borderTopLeftRadius: 24, 
        borderTopRightRadius: 24, 
        padding: 24, 
        paddingBottom: 30 
    },

    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 15 
    },

    title: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#051D3B' 
    },

    closeBtn: { 
        padding: 5 
    },

    description: { 
        fontSize: 14, 
        color: '#828489', 
        marginBottom: 20 
    },
    
    inputContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#F0F2F5', 
        height: 55, 
        borderRadius: 12, 
        paddingHorizontal: 15, 
        marginBottom: 15 
    },

    inputIcon: { 
        marginRight: 10 
    },

    input: { 
        flex: 1, 
        fontSize: 15, 
        color: '#1A1A1A' 
    },
    
    textAreaContainer: { 
        height: 120, 
        alignItems: 'flex-start' 
    },

    textArea: { 
        height: '100%', 
        paddingTop: 15 
    },

    btnBtnSuccess: { 
        backgroundColor: '#21C45D', 
        height: 55, borderRadius: 14, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10 
    },

    btnText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    }
});