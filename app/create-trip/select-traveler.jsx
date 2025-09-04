import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { CreateTripContext } from '../../context/CreateTripContext';
import { SelectTravelesList } from '../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard';
export default function SelectTraveler() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [selectedTraveler, setSelectedTraveler] = useState()
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    })
  }, [])
  useEffect(() => {
    setTripData({
      ...tripData,
      traveler: selectedTraveler
    })
  }, [selectedTraveler])
  useEffect(() => {
    console.log(tripData)
  }, [tripData])
  return (
    <View style={{ padding: 20, paddingTop: 70, flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold' }}>Who's Traveling</Text>
      <Text style={{ marginVertical: 10, fontSize: 20, fontFamily: 'outfit-medium' }}>Choose your traveles</Text>
      {SelectTravelesList.map((item, index) => (
        <TouchableOpacity onPress={() => setSelectedTraveler(item)} style={{ marginVertical: 15 }}>
          <OptionCard option={item} selectedOption={selectedTraveler} />
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => router.push('/create-trip/select-dates')} style={{
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 15,
        marginTop: 55
      }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'outfit' }}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}