import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { GetPhotoRef } from '../../services/GooglePlaceApi';
import HotelCard from './HotelCard';
export default function HotelList({ hotelData }) {
  
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{
        fontSize: 20,
        color: 'black',
        fontFamily: 'outfit-bold',
      }}>🏨 Hotel Reccomendation</Text>
      <FlatList
        style={{ marginTop: 5 }}
        data={hotelData}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <HotelCard hotel={item}/>
        )}
      />
    </View>
  )
}