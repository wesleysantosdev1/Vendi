import React, { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { User, Mail } from 'lucide-react-native';
import { api } from "../../../services/api";
import { BottomSheet } from "../../../components/BottomSheet";
import { TextField } from "../../../components/TextField";
import { Button } from "../../../components/Button";
import { spacing } from "../../../theme";
import { logError } from "../../../utils/logError";

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
        } catch (error: any) {
            logError("Erro ao salvar perfil: ", error);
            Alert.alert("Erro", error.response?.data?.error || "Não foi possível atualizar o perfil.");
        } finally {
            setSaving(false);
        }
    };

    return(
        <BottomSheet visible={visible} onClose={onClose} title="Dados pessoais">
            <TextField
                label="Nome completo"
                Icon={User}
                placeholder="Seu nome"
                value={name}
                onChangeText={setName}
            />

            <TextField
                label="E-mail"
                Icon={Mail}
                placeholder="voce@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Button title="Salvar alterações" onPress={handleSave} loading={saving} style={styles.button} />
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: spacing.sm,
    },
});
