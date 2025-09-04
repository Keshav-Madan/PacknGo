import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { CreateTripContext } from '../../context/CreateTripContext';
import { useNavigation, useRouter } from "expo-router";

export default function SearchPlace() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation=useNavigation();
  const router=useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerShown:true,
      headerTransparent:true,
      headerTitle:'Search'
    })
  }, []);
  const fetchPlaces = async (query) => {
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${query}&key=AlzaSy7Lmh3wtQnDEpjoC9HTubV_7FYb6bVVQmN`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.predictions || []);
    } catch (error) {
      console.error("Error fetching places:", error);
      Alert.alert("Error", "Failed to fetch places. Please try again.");
    }
  };

  const handleSelectPlace = async (place) => {
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/details/json?placeid=${place.place_id}&key=AlzaSy7Lmh3wtQnDEpjoC9HTubV_7FYb6bVVQmN`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const details = await response.json();

      setTripData({
        locationInfo: {
          name: place.description,
          coordinates: details.result.geometry.location,
          photoRef: details.result.photos?.[0]?.photo_reference || null,
          url: details.result.url,
        },
      });
      router.push('/create-trip/select-traveler')
    } catch (error) {
      console.error("Error fetching place details:", error);
      Alert.alert("Error", "Failed to fetch place details. Please try again.");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search places..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          if (text.length > 2) {
            fetchPlaces(text);
          } else {
            setResults([]);
          }
        }}
      />
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => handleSelectPlace(item)}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
        <TouchableOpacity onPress={()=>router.push('/create-trip/select-traveler')} style={{padding:15,
          backgroundColor:'black',
          borderRadius:15,
          marginTop:55
        }}>
          <Text style={{color:'white',textAlign:'center',fontSize:16,fontFamily:'outfit'}}>Continue</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop:80
  },
  input: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
