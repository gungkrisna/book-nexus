import * as React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    StyleSheet,
    View
} from 'react-native';
import { bookCovers } from '../constants';
import Story from './Story';

const handleStoryPress = (index) => {

}

export default function StoriesHorizontal({ data }) {
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.containerContent}
                data={data}
                horizontal
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <Story
                        image={item.image && (bookCovers[item.image]
                        )}
                        writer={item.writer}
                        onPress={handleStoryPress(item.id)}
                        seen={item.hasSeen}
                    />
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

StoriesHorizontal.propTypes = {
    data: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 24,
        width: '100%'
    },
    containerContent: {
        paddingLeft: 16,
        gap: 12
    },
});
