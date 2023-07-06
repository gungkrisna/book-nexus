import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { colors } from '../constants';
import { Feather } from '@expo/vector-icons';
import { formatTime } from '../utils/FormatTime';

export default BookItem = ({ item, showProgress }) => {
  return (
    <View
      style={styles.root}
    >
      <Image source={{ uri: item.bookCover }} style={styles.image} />

      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
      <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">{`${item.authors[0].first_name} ${item.authors[0].last_name}`}</Text>
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>

      <View
        style={{
          flexDirection: "row",
          height: 36,
          alignItems: 'center',
        }}
      >
        <Feather name="headphones" color={colors['gray-1']} size={14} />
        <Text style={{
          marginLeft: 6,
          color: colors['gray-1'],
          fontFamily: 'GothamBook',
          fontSize: 12,
        }}>{formatTime(item.totaltimesecs) || "-"}</Text>
      </View>
      {showProgress && (
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 0
          }}
        >
          <View
            style={[styles.info, { backgroundColor: colors['white'] }]}>
            <Text style={styles.infoText}>69% completed</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 8,
  },
  image: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 2 - 24,
    marginBottom: 8
  },
  title: {
    width: Dimensions.get('window').width / 2 - 40,
    color: colors.white,
    fontFamily: 'GothamMedium',
    fontSize: 14,
    marginBottom: 4
  },
  author: {
    width: Dimensions.get('window').width / 2 - 40,
    color: colors.white,
    fontFamily: 'GothamBook',
    fontSize: 12,
  },
  description: {
    width: Dimensions.get('window').width / 2 - 40,
    color: colors.white,
    fontFamily: 'GothamBook',
    fontSize: 10,
    marginTop: 8,
    lineHeight: 12,
  },
  info: {
    alignItems: "center",
    flexDirection: "row",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 4,
    height: 24
  },
  infoText: {
    marginHorizontal: 4,
    color: colors.black,
    fontFamily: 'GothamMedium',
    fontSize: 10,
  }
});
