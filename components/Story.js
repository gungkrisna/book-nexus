import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { colors } from '../constants';

export default function Story({ image, writer, onPress, seen }) {
    const [isSeen, setIsSeen] = useState(seen);

    useEffect(() => {
        setIsSeen(seen);
    }, [seen]);

    const borderColor = isSeen ? colors['gray-4'] : colors['accent-green'];

    const handlePress = () => {
        setIsSeen(true);
        onPress && onPress(true); // call the onPress callback with the seen state as a parameter
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress} style={[styles.avatarContainer, { borderColor }]}>

                {image && (<Image source={image} style={styles.avatar} />)}
                {!image && (<View style={styles.avatar}>
                    <Text style={styles.avatarText}>{writer[0].toUpperCase()}</Text>
                </View>)}
            </TouchableOpacity>
            <Text style={styles.writer} numberOfLines={1}>{writer}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarContainer: {
        width: 76,
        height: 76,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 76/2,
        margin: 4,
        borderColor: colors['accent-green'],
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 64/2,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    },
    writer: {
        fontFamily: 'GothamBook',
        fontSize: 10,
        color: colors.white,
        maxWidth: 76,
    },
});
