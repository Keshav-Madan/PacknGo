import { View, Text,TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
export default function signin() {
    const router=useRouter();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const onSignIn=()=>{
      if(!email&&!password){
        ToastAndroid.show('please enter email and password',ToastAndroid.LONG)
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('/mytrip')
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    if(errorCode=='auth/invalid-credential'){
      ToastAndroid.show('Invalid Email or Password',ToastAndroid.LONG)
    }
  });
    }
  return (
    <View style={{paddingTop:20,padding:15,backgroundColor:'white', flex:1}}>
        <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons style={{paddingBottom:20,fontSize:25,}} name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Text style={{fontSize:30,fontFamily:'outfit-bold'}}>Let's Sign You in</Text>
      <Text style={{fontSize:30,marginTop:20,fontFamily:'outfit-medium',color:'#555555'}}>Welcome Back</Text>
      <Text style={{fontSize:30,marginTop:20,fontFamily:'outfit',color:'grey'}}>You've been missed</Text>
      <View style={{marginTop:50}}>
        <Text style={{fontFamily:'outfit'}}>Email</Text>
        <TextInput onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder='Enter your Email'/>
      </View>
      <View style={{marginTop:30}}>
        <Text style={{fontFamily:'outfit'}}>Password</Text>
        <TextInput onChangeText={(text)=>setPassword(text)} secureTextEntry={true} style={styles.input} placeholder='Enter your Password'/>
      </View>
      <TouchableOpacity onPress={()=>onSignIn()} style={{padding:15,
        backgroundColor:'black',
        borderRadius:15,
        marginTop:55
      }}>
        <Text style={{color:'white',textAlign:'center',fontSize:16}}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.replace('auth/sign-up')} style={{padding:15,
        marginTop:25,
        borderWidth:1,
        borderRadius:15,
      }}>
        <Text style={{color:'black',textAlign:'center',fontSize:16}}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    input: {
        padding:20,
        fontFamily:'outfit',
        height:60,
        borderWidth:1,
        borderRadius:15,
        borderColor:'grey'
    },
    text:{
        color:'white',
        fontSize:18,
        fontFamily:'outfit'
    }
})
