import { Image, View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import PlaceCard from './PlaceCard';
export default function PlannedTrip({ itineraryDetails }) {
  const show = (data) => {
    console.log(data)
  }
  
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{
        fontSize: 20,
        color: 'black',
        fontFamily: 'outfit-bold',
      }}>🏝️ Planned Details</Text>
      {/* <Text>{itineraryDetails}</Text> */}
      {Object.entries(itineraryDetails).map(([day, details]) => (
        <View ><Text style={{
          marginTop: 5,
          fontSize: 20,
          color: 'black',
          fontFamily: 'outfit-medium',
        }}>{'Day ' + day.charAt(0).toUpperCase() + day.slice(1)}</Text>
          {
            details.activities?.map((activity, index) => (
              <PlaceCard activity={activity}/>
            ))
          }
        </View>
      ))}
    </View>
  )
}