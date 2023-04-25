import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constants';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import Chip from '../components/Chip';
import BooksGrid from '../components/BooksGrid';

import fictionBooks from '../mockdata/fictionBooks.json';
import cultureAndSocietyBooks from '../mockdata/cultureAndSocietyBooks.json';
import lifestyleBooks from '../mockdata/lifestyleBooks.json';

function LibraryScreen() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChipPress = (index) => {
        setActiveIndex(index);
    };

    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
            <ScrollView  >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                        height: 48
                    }}
                >
                    <View style={{ flexDirection: 'col' }}>
                        <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>My Library</Text>
                        <View style={{
                            marginTop: 5,
                            borderBottomColor: colors['accent-green'],
                            borderBottomWidth: 2,
                        }} />
                    </View>
                </View >

                <ScrollView
                    contentContainerStyle={styles.chipContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <Chip
                        label="Saved Books"
                        icon={<Feather name="bookmark" size={18}/>}
                        onPress={() => handleChipPress(0)}
                        active={activeIndex === 0}
                    />
                    <Chip
                        label="In Progress"
                        icon={<Feather name="headphones" size={18}/>}
                        onPress={() => handleChipPress(1)}
                        active={activeIndex === 1}
                    />
                    <Chip
                        label="Completed"
                        icon={<FontAwesome5 name="check-circle" size={18}/>}
                        onPress={() => handleChipPress(2)}
                        active={activeIndex === 2}
                    />
                </ScrollView>

                {activeIndex === 0 && <BooksGrid data={fictionBooks} hasMetadata={true} />}
                {activeIndex === 1 && <BooksGrid data={cultureAndSocietyBooks} hasMetadata={false} />}
                {activeIndex === 2 && <BooksGrid data={lifestyleBooks} hasMetadata={true} />}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#181A1A',
    },
    chipContainer: {
        paddingHorizontal: 16,
        marginVertical: 24
    }
});

export default LibraryScreen;