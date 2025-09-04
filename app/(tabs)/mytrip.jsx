import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNew from '../../components/MyTrips/StartNew';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';
export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false)
  const router=useRouter();
  useEffect(()=>{
    user&&GetMyTrips();
  },[user])
  const GetMyTrips = async() => {
    setLoading(true)
    setUserTrips([]);
    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev=>[...prev,doc.data()])
    });
    setLoading(false)
  }
  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 35, fontFamily: 'outfit-bold' }}>My Trips</Text>
        <TouchableOpacity onPress={()=>router.push('/create-trip/search-place')}>
        <Ionicons name="add-circle" size={35} color="black" />
        </TouchableOpacity>
      </View>
      {userTrips.length == 0 ? <StartNew /> : <UserTripList userTrips={userTrips}/>}
      {loading&&<ActivityIndicator size={'large'} color={'black'}/>}
    </View>
  )
}