// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Search } from "react-native-unicons"
import { colors } from "../constants";

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setCLicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Search
          name="search"
          height="16"
          color={colors['gray-1']}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Title, author, or keyword"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          placeholderTextColor={colors['gray-2']}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
    container: {
      marginVertical: 24,
      marginHorizontal: 16,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
    },
    searchBar__unclicked: {
      paddingHorizontal: 16,
      height: 45,
      gap: 10,
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors['gray-4'],
      borderRadius: 8,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors['gray-3'],
    },
    searchBar__clicked: {
      paddingHorizontal: 16,
      height: 45,
      gap: 10,
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors['gray-4'],
      borderRadius: 8,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors['accent-green'],
    },
    input: {
      fontFamily: "GothamBook",
      fontSize: 14,
      lineHeight: 16
    },
  });
  
  
  
  
  
  
  