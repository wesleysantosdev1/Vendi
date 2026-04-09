import React, {useState, useEffect} from "react";
import { View, Text, Modal, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform, StyleSheet, Alert, ActivityIndicator } from "react-native"; 
import { X, User, Mail  } from 'lucide-react-native';
import { api } from "../../../services/api";

interface Props {
    visible: boolean;
    onClose: () => void;
    initialData: { name: string, email: string };
}

export const EditProfileModal = ({ visible, onClose, initialData }: Props ) => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if(visible) {
            setName(initialData.name);
            setEmail(initialData.email);
        }
    }, [visible, initialData?.name, initialData?.email]);

    const handleSave = async () => {
        if (!name || !email) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        try{
            setSaving(true);
            await api.post('/users/update', { name, email });
            Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
            onClose();
        } catch (error) {
            console.log("Erro ao salvar perfil: ", error);
            Alert.alert("Error", "Não foi possível atualizar o perfil.");
        } finally {
            setSaving(false);
        }
    };

    return(
        <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.overlay}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Editar Dados</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <X size={24} color="#828489" />
                        </TouchableOpacity>
                    </View>

                    {/* Input Nome */}
                    <View style={styles.inputContainer}>
                        <User size={20} color="#828489" style={styles.inputIcon} />
                        <TextInput 
                        placeholder="Nome completo" 
                        style={styles.input} 
                        value={name} 
                        onChangeText={setName}
                        placeholderTextColor="#828489"
                        />
                    </View>

                    {/* Input E-mail */}
                    <View style={styles.inputContainer}>
                        <Mail size={20} color="#828489" style={styles.inputIcon} />
                        <TextInput 
                        placeholder="E-mail" 
                        style={styles.input} 
                        value={email} 
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#828489"
                        />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={handleSave} disabled={saving}>
                        {saving ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.btnText}>Salvar Alterações</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'flex-end' 
    },

    content: { 
        backgroundColor: '#FFF', 
        borderTopLeftRadius: 24, 
        borderTopRightRadius: 24, 
        padding: 24, 
        paddingBottom: 40 
    },

    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 25 
    },

    title: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#051D3B' 
    },

    closeBtn: { 
        padding: 5 
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
    
    btn: { 
        backgroundColor: '#4963E4', 
        height: 55, 
        borderRadius: 14, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 15 
    },

    btnText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
})