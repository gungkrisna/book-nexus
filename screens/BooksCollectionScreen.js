import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BooksFetcher from '../components/BooksFetcher';
import BookItem from '../components/BookItem';
import { StatusBar } from 'expo-status-bar';
import { AudiobookContext } from '../context/AudiobookContextProvider';
import LoadingIndicator from '../components/LoadingIndicator';

export default function BooksCollectionScreen({ route }) {
  const { handleUpdateAudiobookData } = useContext(AudiobookContext);

  const { params, header } = route.params;
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(true);
  const [limit, setLimit] = useState(10);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);

  const onLoadMore = () => {
    setLimit(prevLimit => prevLimit + 10);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => { opacity: pressed ? 0.7 : 1.0 }}
      onPress={() => handleUpdateAudiobookData(item)}>
      <BookItem item={item} />
    </Pressable>
  );

  useEffect(() => {
    if (isRefreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 0);
    }
  }, [isRefreshing]);

  useEffect(() => {
    if (loadingMore) {
      setTimeout(() => {
        setLoadingMore(false);
      }, 0);
    }
  }, [loadingMore]);

  return (
    <SafeAreaView edges={['right', 'left', 'top']} style={styles.root}>
      <StatusBar style='light' />
      <BooksFetcher params={{ ...params, limit }} refresh={isRefreshing}>
        {({ books, loading }) => {
          return (loading && !initialFetchComplete) ? (<LoadingIndicator />) : (
            <>
              {setInitialFetchComplete(true)}
              <View style={styles.container}>
                <Pressable style={{ marginBottom: 16, marginHorizontal: 16, flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.pop()}>
                  <Ionicons name="chevron-back" size={24} color="white" />
                  <Text style={{ fontSize: 16, color: colors.white, fontFamily: 'GothamMedium', marginLeft: 4 }}>Back</Text>
                </Pressable>
                <View style={{ flexDirection: 'column', marginHorizontal: 16, marginVertical: 16 }}>
                  <Text style={{ fontSize: 36, color: colors.white, fontFamily: 'GothamBold' }}>{header}</Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <FlatList
                  style={{ flex: 1 }}
                  data={books}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  contentContainerStyle={styles.contentContainer}
                  refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => setRefreshing(true)} />}
                  onEndReached={onLoadMore}
                  onEndReachedThreshold={0.7}
                  ListHeaderComponent={loading && <ActivityIndicator size='small' color={colors['accent-green']} />}
                  ListFooterComponent={loadingMore && <ActivityIndicator size='small' color={colors['accent-green']} />}
                  ListHeaderComponentStyle={{ marginTop: 8, marginBottom: 8 }}
                  ListFooterComponentStyle={{ marginTop: 8, marginBottom: 24 }}
                />
              </View>
            </>
          );
        }}
      </BooksFetcher>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#181A1A',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  contentContainer: {
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});
