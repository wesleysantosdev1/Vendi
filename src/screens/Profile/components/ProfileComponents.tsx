import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { ChevronRight, LucideIcon} from 'lucide-react-native';

export const StatCard = ({ label, value }: {label: string; value: string | number }) => (
    <View style={styles.statCard}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

export const MenuItem = ({ Icon, label, onPress, color = '#051D3B' }: { Icon: LucideIcon, label: string, onPress: () => void, color?: string }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuLeft}>
            <Icon size={22} color={color} strokeWidth={1.5} />
            <Text style={[styles.menuLabel, { color }]}>{label}</Text>
        </View>

        <ChevronRight size={20} color="#828489" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    statCard: { 
        backgroundColor: '#FFF', 
        width: '31%', 
        padding: 15, 
        borderRadius: 16, 
        alignItems: 'center', 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.05 
    },

    statValue: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#051D3B' 
    },

    statLabel: { 
        fontSize: 10, 
        color: '#828489', 
        fontWeight: 'bold', 
        marginTop: 4, 
        textTransform: 'uppercase' 
    },

    menuItem: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#FFF', 
        padding: 18, 
        borderRadius: 16, 
        marginBottom: 12 
    },

    menuLeft: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },

    menuLabel: { 
        fontSize: 15, 
        fontWeight: '500',
        marginLeft: 15 
    },
});