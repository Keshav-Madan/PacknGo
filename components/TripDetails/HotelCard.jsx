import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function HotelCard({hotel}) {
    const [photoRef,setPhotoRef]=useState()
    useEffect(()=>{
        getPhotoRef();
      },[])
    const getPhotoRef=async()=>{
        const result=await GetPhotoRef(hotel.hotelName);
        setPhotoRef(result?.results[0].photos[0]?.photo_reference);
      };
  return (
    <View style={{borderWidth:1,borderColor:'#D9D9D9',borderRadius:15,padding:8,backgroundColor:'#F5F5F5',marginRight:10}}>
            <Image
                style={{ height: 140, width: 230, borderRadius: 15 }}
                source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                }}
            />
            <View style={{width:210}}>
              <Text style={{
                fontSize: 16,
                color: 'black',
                fontFamily: 'outfit-medium',
                marginTop:5,
              }}>{hotel.hotelName}</Text>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{
                fontFamily: 'outfit-medium',
              }}>⭐ {hotel.rating}</Text>
              <Text style={{
                fontFamily: 'outfit-medium',
                fontSize:12.5
              }}>💵 {hotel.priceRange}</Text>
              </View>
            </View>
          </View>
  )
}