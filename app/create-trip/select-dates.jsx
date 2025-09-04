import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';
export default function SelectDates() {
  const router=useRouter();
  const {tripData,setTripData}=useContext(CreateTripContext);
    const navigation=useNavigation();
    const [startDate,setStartDate]=useState();
    const [endDate,setEndDate]=useState();
    const onDateChange=(date,type)=>{
      if(type=="START_DATE")
        setStartDate(moment(date));
      else
        setEndDate(moment(date));
    }
    const onDateSelection=(date,type)=>{
      if(!startDate&&!endDate){
        ToastAndroid.show('Please Select Start & End Date',ToastAndroid.LONG)
        return;
      }
      const totalDays=endDate.diff(startDate,'days')
      setTripData({
        ...tripData,
        startDate:startDate,
        endDate:endDate,
        totalDays:totalDays+1
      })
      router.push('/create-trip/select-budget')
    }
    useEffect(()=>{
            console.log(tripData)
        },[tripData])
    useEffect(()=>{
            navigation.setOptions({
                headerShown:true,
                headerTransparent:true,
                headerTitle:''
            })
        },[])
  return (
    <View style={{ paddingTop: 55,padding:20,backgroundColor:'white',flex:1 }}>
      <Text style={{fontSize:40,marginBottom:30,fontFamily:'outfit-bold'}}>Travel Dates</Text>
      <View style={{height:'50%',justifyContent:'center'}}>
  <CalendarPicker 
  allowRangeSelection={true} 
  onDateChange={onDateChange} 
  minDate={new Date()}
  maxRangeDuration={5}
  selectedRangeStyle={{
    backgroundColor:'black',
  }}
  selectedDayTextStyle={{
    color:'white'
  }}
  />
  </View>
  <TouchableOpacity onPress={onDateSelection} style={{padding:15,
    backgroundColor:'black',
    borderRadius:15,
    marginTop:55
  }}>
    <Text style={{color:'white',textAlign:'center',fontSize:16,fontFamily:'outfit'}}>Continue</Text>
    </TouchableOpacity>
</View>
  )
}