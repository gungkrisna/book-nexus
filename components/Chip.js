import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function Chip({ label, icon, onPress, active }) {
    const [isActive, setIsActive] = useState(active);

    useEffect(() => {
        setIsActive(active);
    }, [active]);

    const chipStyle = isActive
        ? {
            backgroundColor: '#CDE7BE',
            borderColor: 'transparent',
        }
        : {
            backgroundColor: 'transparent',
            borderColor: '#313333',
        };
    const labelStyle = isActive
        ? { color: '#313333' }
        : { color: '#EAF4F4' };
    const iconStyle = isActive
        ? { color: '#313333' }
        : { color: '#EAF4F4' };

    const handlePress = () => {
        setIsActive(true);
        onPress && onPress(true); // call the onPress callback with the active state as a parameter
    };

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.chip, chipStyle]}>
            {icon && <View style={styles.iconContainer}>{
                React.cloneElement(icon, { style: iconStyle })
            }</View>}
            <Text style={[styles.label, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chip: {
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginEnd: 4,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderWidth: 1,
    },
    iconContainer: {
        marginRight: 4,
    },
    label: {
        fontFamily: 'GothamMedium',
        fontSize: 14,
    },
});
