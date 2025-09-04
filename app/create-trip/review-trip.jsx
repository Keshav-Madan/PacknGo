import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';
export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);
  const router=useRouter();
  return (
    <View style={{ paddingTop: 55, padding: 20, backgroundColor: 'white', flex: 1 }}>
      <Text style={{ fontSize: 40, fontFamily: 'outfit-bold' }}>Review Your Trip</Text>
      <Text style={{ paddingTop: 20, fontSize: 20, fontFamily: 'outfit', color: 'grey' }}>Before generating your trip, please review your selection!</Text>
      {/* Destination info */}
      <View style={{ display: 'flex', paddingTop: 40, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontSize: 35, }}>📍</Text>
        <View>
          <Text style={{ fontSize: 20, fontFamily: 'outfit-bold', color: 'black' }}>Destination</Text>
          <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', color: 'grey' }}>{tripData?.locationInfo?.name}</Text>
        </View>
      </View>
      {/* Date info */}
      <View style={{ display: 'flex', paddingTop: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontSize: 35, }}>📅</Text>
        <View>
          <Text style={{ fontSize: 20, fontFamily: 'outfit-bold', color: 'black' }}>Travel Date</Text>
          <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', color: 'grey' }}>{moment(tripData?.startDate).format('DD MMMM') + " To " + moment(tripData?.endDate).format('DD MMMM') + " (" + tripData?.totalDays + " days)"}</Text>
        </View>
      </View>
      {/* Travele info */}
      <View style={{ display: 'flex', paddingTop: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontSize: 35, }}>🚌</Text>
        <View>
          <Text style={{ fontSize: 20, fontFamily: 'outfit-bold', color: 'black' }}>Who's Travelling</Text>
          <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', color: 'grey' }}>{tripData?.traveler?.title}</Text>
        </View>
      </View>
      {/* budget info */}
      <View style={{ display: 'flex', paddingTop: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontSize: 35, }}>💵</Text>
        <View>
          <Text style={{ fontSize: 20, fontFamily: 'outfit-bold', color: 'black' }}>Budget</Text>
          <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', color: 'grey' }}>{tripData?.budget}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.replace('/create-trip/generate-trip')} style={{
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 15,
        marginTop: 55
      }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontFamily: 'outfit' }}>Build My Trip</Text>
      </TouchableOpacity>
    </View>
  )
}