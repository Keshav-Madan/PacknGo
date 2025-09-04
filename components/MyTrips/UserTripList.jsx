import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import moment from 'moment'
import UserTripCard from './UserTripCard'
import { useRouter } from 'expo-router'

export default function UserTripList({userTrips}) {
    const LatestTrip=JSON.parse(userTrips[0].tripData)
    const router=useRouter();
    return (
    <ScrollView style={{marginTop:30}}>
      {LatestTrip?.locationInfo?.photoRef?
      <Image style={{borderRadius:15,height:200,width:350}} source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+LatestTrip.locationInfo.photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}/>
      :<Image style={{borderRadius:15,height:200,width:350}} source={require('./../../assets/images/loadin2.gif')}/>
    }
      <View>
        <Text style={{fontSize:24,marginTop:10, fontFamily:'outfit-bold'}}>{userTrips[0]?.tripPlan?.tripDetails?.location}</Text>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={{fontSize:17,marginTop:2, fontFamily:'outfit'}}>{moment(LatestTrip.startDate).format('DD MMMM YYYY')}</Text>
          <Text style={{fontSize:19,marginTop:2, fontFamily:'outfit'}}>🚌 {LatestTrip.traveler.title}</Text>
        </View>
        
        <TouchableOpacity onPress={()=>router.push({pathname:'/trip-details',params:{
          trip:JSON.stringify(userTrips[0])
        }})} style={{
                padding: 15,
                backgroundColor: 'black',
                borderRadius: 15,
                marginTop: 14
              }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 17, fontFamily: 'outfit' }}>See your plan</Text>
        </TouchableOpacity>
        {userTrips.map((item,index)=>(
          <UserTripCard trips={item} key={index}/>
        ))}
      </View>
    </ScrollView>
  )
}