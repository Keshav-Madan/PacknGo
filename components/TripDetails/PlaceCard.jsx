import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GetPhotoRef } from '../../services/GooglePlaceApi';
export default function PlaceCard({ activity }) {
    useEffect(()=>{
        getPhotoRef()
      },[])
      const [photoRef,setPhotoRef]=useState()
      const getPhotoRef=async()=>{
        const result=await GetPhotoRef(activity.placeName);
        setPhotoRef(result?.results[0].photos[0]?.photo_reference);
      }
    return (
        <View>
            <View style={{ borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 15, padding: 8, backgroundColor: '#F5F5F5', marginTop: 10 }} >
                {
                    photoRef?
                    <Image style={{ height: 120, width: '100%', borderRadius: 15 }} source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                    }} />:
                    null
                }
                <Text style={{
                    marginTop: 5,
                    fontSize: 18,
                    color: 'black',
                    fontFamily: 'outfit-medium',
                }}>📌 {activity.placeName}</Text>
                <Text style={{
                    width: '90%',
                    fontSize: 15,
                    color: 'grey',
                    fontFamily: 'outfit',
                }}>{activity.placeDetails}</Text>
                <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '80%' }}>
                        <Text style={{
                            marginTop: 5,
                            fontSize: 15,
                            color: 'black',
                            fontFamily: 'outfit-medium',
                        }}><Text style={{
                            fontFamily: 'outfit-bold'
                        }}>🎫 Ticket Price: </Text >{activity?.ticketPricing}</Text>
                        <Text style={{
                            marginTop: 5,
                            fontSize: 15,
                            color: 'black',
                            fontFamily: 'outfit-medium',
                        }}><Text style={{
                            fontFamily: 'outfit-bold'
                        }}>🕣 Time: </Text>{activity?.travelTime}</Text>
                    </View>

                    <TouchableOpacity style={{
                        height: 35,
                        width: 35,
                        backgroundColor: 'black',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <FontAwesome name="send" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}