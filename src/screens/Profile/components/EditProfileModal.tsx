import React, {useState, useEffect} from "react";
import { View, Text, Modal, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform, StyleSheet } from "react-native"; 
import { X, User, Mail  } from 'lucide-react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const EditProfileModal = ({ visible, onClose }: Props ) => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 

    useEffect(() => {
        if(visible) {
            setName('Wesley Santos');
            setEmail('wesleysanto@gmail.com');
        }
    }, [visible]); 

    const handleSave = () => {
        console.log("Salvando perfil: ", { name, email });
        onClose();
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

                    <TouchableOpacity style={styles.btn} onPress={handleSave}>
                        <Text style={styles.btnText}>Salvar Alterações</Text>
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