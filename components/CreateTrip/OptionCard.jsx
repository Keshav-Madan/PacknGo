import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({option,selectedOption}) {
  return (
    <View style={[{
        padding:15,display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#F0F0F0',
        borderRadius:10
        },selectedOption?.title==option.title&&{borderWidth:1}]}>
      <View>
        <Text style={{fontSize:20,fontFamily:'outfit-bold'}}>{option?.title}</Text>
        <Text style={{fontSize:17,color:'grey',fontFamily:'outfit'}}>{option?.desc}</Text>
      </View>
      <Text style={{fontSize:40,color:'grey',fontFamily:'outfit'}}>{option?.icon}</Text>
    </View>
  )
}