import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'; 
import { LucideIcon } from 'lucide-react-native';

interface Props {
    label: string; 
    Icon: LucideIcon; 
    color: string; 
    bgColor: string; 
    isPrimary?: boolean;
}

export const QuickAction = ({ label, Icon, color, bgColor, isPrimary }: Props) => (
    <TouchableOpacity style={styles.container}>
        <View style={[
            styles.box, 
            { backgroundColor: isPrimary ? '#3653E2' : bgColor }
        ]}>
            <Icon 
                size={22} 
                color={isPrimary ? '#FFF' : color} 
                strokeWidth={2.5} 
            />
        </View>

        <Text style={[
            isPrimary ? styles.labelPrimary : styles.label, 
            { color: isPrimary ? '#3653E2' : color }
        ]}>
            {label}
        </Text>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    container: {
        width: '23%', 
        alignItems: 'center',
    },

    box: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },

    label: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    labelPrimary: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
