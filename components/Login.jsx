import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Image style={{ width: '100%', height: 500 }} source={require('./../assets/images/login.jpg')} />
            <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 40, fontFamily: 'outfit-bold', textAlign: 'center' }}>Trip Planner</Text>
                <Text style={{ marginTop: 10, fontSize: 18, color: 'grey', fontFamily: 'outfit', textAlign: 'center' }}>Discover your next adventure effortlessly. Personalised itinearies at your fingertips. Travel smarter with AI-driver insights.</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/auth/sign-in')}
            >
                <Text style={styles.text}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        borderRadius: 99,
        padding: 20,
        margin: 20,
        marginTop: 40,
        alignItems:'center'
    },
    text:{
        color:'white',
        fontSize:18,
        fontFamily:'outfit'
    }
})