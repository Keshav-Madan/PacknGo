import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../configs/FirebaseConfig';
export default function signup() {
    const router = useRouter();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [name,setName]=useState();
    const OnCreateAccoumt = () => {
        if(!email && !name && !password ){
            ToastAndroid.show('Please Enter all details',ToastAndroid.LONG)
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                console.log(user)
                router.replace('/mytrip')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage,errorCode)
                // ..
            });
    }
    return (
        <View style={{ paddingTop: 20, padding: 15, backgroundColor: 'white', flex: 1 }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons style={{ paddingBottom: 20, fontSize: 25, }} name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 30, fontFamily: 'outfit-bold' }}>Create New Account</Text>
            <View style={{ marginTop: 50 }}>
                <Text style={{ fontFamily: 'outfit' }}>Full Name</Text>
                <TextInput onChangeText={(text)=>setName(text)} style={styles.input} placeholder='Enter your Full Name' />
            </View>
            <View style={{ marginTop: 25 }}>
                <Text style={{ fontFamily: 'outfit' }}>Email</Text>
                <TextInput onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder='Enter your Email' />
            </View>
            <View style={{ marginTop: 25 }}>
                <Text style={{ fontFamily: 'outfit' }}>Password</Text>
                <TextInput onChangeText={(text)=>setPassword(text)} secureTextEntry={true} style={styles.input} placeholder='Enter your Password' />
            </View>
            <TouchableOpacity onPress={OnCreateAccoumt} style={{
                padding: 15,
                backgroundColor: 'black',
                borderRadius: 15,
                marginTop: 55
            }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace('auth/sign-in')} style={{
                padding: 15,
                marginTop: 25,
                borderWidth: 1,
                borderRadius: 15,
            }}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Sign in</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        padding: 20,
        fontFamily: 'outfit',
        height: 60,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'grey'
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'outfit'
    }
})
