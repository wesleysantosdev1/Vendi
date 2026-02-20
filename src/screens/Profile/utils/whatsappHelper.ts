import { Linking, Alert } from 'react-native';

export const handleSupportWhatsApp = (nome: string, problema: string) => {
    const phone = "5585999295091";
    const message = `Olá, meu nome é ${nome}. Estou entrando em contato pelo suporte do VendaFácil. Problema: ${problema}`;
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            const webUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            Linking.openURL(webUrl);
        }
    }).catch(() => {
        Alert.alert("Erro", "Não foi possível abrir o WhatsApp");
    });
};