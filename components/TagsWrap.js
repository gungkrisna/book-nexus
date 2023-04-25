import * as React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { colors } from '../constants';
import Tag from './Tag';

export default function TagsWrap({ tags, heading }) {
    return (
        <View style={styles.container}>
            {heading &&
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{heading}</Text>
                </View>
            }
            <View style={styles.tagContainer}>
                {tags.map((tag, index) => (
                    <View key={index} style={{marginRight: 8, marginBottom: 13}} >
                    <Tag label={tag.label}/>
                    </View>
                ))}
            </View>
        </View>
    );
}

TagsWrap.propTypes = {
    tags: PropTypes.array,
    heading: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 27,
        width: '100%'
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    heading: {
        fontFamily: 'GothamBold',
        fontSize: 20,
        color: colors.white,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 16,
    },
});
