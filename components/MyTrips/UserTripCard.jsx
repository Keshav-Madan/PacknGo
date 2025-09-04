import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function UserTripCard({trips}) {
    const LatestTrip=JSON.parse(trips.tripData)
  return (
    <View style={{marginTop:30}}>
        <View  style={{display:'flex',flexDirection:'row',gap:20,alignItems:'center'}}>
          {LatestTrip?.locationInfo?.photoRef?
                <Image style={{borderRadius:15,height:100,width:100}} source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+LatestTrip.locationInfo.photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}/>
                :<Image style={{borderRadius:15,height:100,width:100}}  source={require('./../../assets/images/loadin2.gif')}/>
              }
          <View>
            <Text style={{fontSize:24,marginTop:10, fontFamily:'outfit-bold'}}>{trips.tripPlan?.tripDetails?.location}</Text>
            <View>
              <Text style={{fontSize:17,marginTop:2, fontFamily:'outfit'}}>{moment(LatestTrip.startDate).format('DD MMMM YYYY')}</Text>
              <Text style={{fontSize:19,marginTop:2, fontFamily:'outfit'}}>🚌 {LatestTrip.traveler.title}</Text>
            </View>
        </View>
        </View>
      
    </View>
  )
}