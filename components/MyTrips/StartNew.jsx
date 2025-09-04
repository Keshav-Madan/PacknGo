import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
export default function StartNew() {
    const router=useRouter();
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',padding:20}}>
      <Entypo name="location-pin" size={50} color='black' />
      <Text style={{fontSize:30,fontFamily:'outfit-medium'}}>No Trips Planned Yet</Text>
      <Text style={{fontSize:20,marginTop:25,color:'grey',fontFamily:'outfit',textAlign:'center'}}>Looks like its time to plan a new travel experience! Get Started below</Text>
      <TouchableOpacity 
      onPress={()=>router.push('/create-trip/search-place')} 
      style={{
        marginTop:25,backgroundColor:'black',
        borderRadius:20,padding:20,paddingHorizontal:30
        }}>
        <Text style={{color:'white',textAlign:'center',fontSize:20,fontFamily:'outfit-medium'}}>Start a new Trip</Text>
      </TouchableOpacity>
    </View>
  )
}