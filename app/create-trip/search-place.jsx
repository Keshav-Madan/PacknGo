import React, { useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const {tripData,setTripData}=useContext(CreateTripContext);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  useEffect(()=>{
    console.log(tripData)
  },[tripData])

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        minLength={2}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log("Place Data:", data);
          console.log("Place Details:", details);
          setTripData({
            locationInfo:{
              name:data.description,
              coordinates:details?.geometry.location,
              photoRef:details?.photos[0].photo_reference,
              url:details?.url
            }
          })
          router.push('/create-trip/select-traveler')
        }}
        styles={{
          textInput: {
            borderWidth: 1,
            borderColor: "gray",
            padding: 10,
            borderRadius: 8,
          },
          listView: {
            backgroundColor: "white",
          },
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: "en",
        }}
        debounce={400}
        onFail={(error) => console.error("Autocomplete Error:", error)}
      />
      <TouchableOpacity
        onPress={() => router.push("/create-trip/select-traveler")}
        style={styles.continueButton}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 80,
  },
  continueButton: {
    padding: 15,
    backgroundColor: "black",
    borderRadius: 15,
    marginTop: 55,
  },
  continueText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "outfit",
  },
});
