import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function FlightInfo({ flightData }) {
    return (
        <View style={{marginTop:20,display:'flex',flexDirection:'row',borderWidth:1,borderColor:'#D9D9D9',borderRadius:15,padding:10,backgroundColor:'#F5F5F5',}}>
            <View style={{width:'70%'}}>
            <Text style={{
                fontSize: 20,
                color: 'black',
                fontFamily: 'outfit-bold',
            }}>✈️ Flights</Text>
            <Text style={{
                fontSize: 18,
                fontFamily: 'outfit-medium',
            }}>Airline:{flightData.airline}</Text>
            <Text style={{
                
                fontSize: 14,
                fontFamily: 'outfit',
            }}>{flightData.flightPriceEstimate}</Text>
            </View>
            <TouchableOpacity>
                <Text style={{
                color:'white',
                padding: 8,
                backgroundColor: 'black',
                borderRadius: 10,
                width:100,
                textAlign:'center'
              }}>Book here</Text>
            </TouchableOpacity>
        </View>
    )
}