import { View, Image, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import FlightInfo from './../../components/TripDetails/FlightInfo';
import HotelList from './../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    try {
      if (typeof trip === 'string') {
        const parsedTrip = JSON.parse(trip); // Parse the main trip object
        if (parsedTrip.tripData) {
          parsedTrip.tripData = JSON.parse(parsedTrip.tripData); // Parse the nested tripData
        }
        setTripDetails(parsedTrip);
      } else {
        setTripDetails(trip);
      }
    } catch (error) {
      console.error('Error parsing trip data:', error);
    }
  }, [trip]);

  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      {tripDetails?.tripData?.locationInfo?.photoRef && process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY ? (
        <Image
          style={{ height: 250, width: '100%' }}
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripDetails.tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
          No Image Available
        </Text>
      )}
      <View
        style={{
          padding: 25,
          height: '100%',
          width: '100%',
          marginTop: -20,
          borderRadius: 20,
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontSize: 24,  fontFamily: 'outfit-bold' }}>
          {tripDetails?.tripPlan?.tripDetails?.location || 'No Location Provided'}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 18,
              color: 'grey',
              fontFamily: 'outfit',
            }}
          >
            {tripDetails?.tripData?.startDate
              ? moment(tripDetails.tripData.startDate).format('DD MMMM YYYY')
              : 'Start Date Unknown'}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'grey',
              fontFamily: 'outfit',
            }}
          >
            {' '}
            -{' '}
            {tripDetails?.tripData?.endDate
              ? moment(tripDetails.tripData.endDate).format('DD MMMM YYYY')
              : 'End Date Unknown'}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: 'grey',
            fontFamily: 'outfit',
          }}
        >
          🚌 {tripDetails?.tripData?.traveler?.title || 'Traveler Details Unavailable'}
        </Text>
        <FlightInfo flightData={tripDetails?.tripPlan?.flights || {}} />
        <HotelList hotelData={tripDetails?.tripPlan?.hotels || {}} />
        <PlannedTrip itineraryDetails={tripDetails?.tripPlan?.dailyItinerary|| {}}/>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {tripDetails?.tripData?.locationInfo?.name || 'Unknown Location'}
        </Text>
      </View>
    </ScrollView>
  );
}
