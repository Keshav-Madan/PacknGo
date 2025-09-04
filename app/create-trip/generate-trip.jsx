
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import React, { useContext, useEffect, useState } from 'react';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModal';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
export default function GenerateTrip() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false)
  const user = auth.currentUser;
  useEffect(() => {
    tripData && GenerateAiTrip()
  }, [])
  const GenerateAiTrip = async () => {
    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", tripData?.locationInfo?.name)
        .replace("{totalDay}", tripData?.totalDays)
        .replace("{totalNight}", tripData?.totalDays - 1)
        .replace("{traveler}", tripData?.traveler?.title)
        .replace("{budget}", tripData?.budget);

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();
      console.log(responseText);

      const tripResponse = JSON.parse(responseText);
      const docId = Date.now().toString();

      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user.email,
        tripPlan: tripResponse,
        tripData: JSON.stringify(tripData),
        docId: docId,
      });

      console.log("Navigating to mytrip...");

      setTimeout(() => {
        router.push("(tabs)/mytrip");
      }, 500);

    } catch (error) {
      console.error("Error saving trip or navigating:", error);
    }
  };

  return (
    <View style={{ paddingTop: 40, padding: 20, backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 40, fontFamily: 'outfit-bold', textAlign: 'center' }}>Please Wait...</Text>
      <Text style={{ paddingTop: 5, textAlign: 'center', fontSize: 23, fontFamily: 'outfit-medium', color: 'grey' }}>
        We are working to generate your dream trip
      </Text>
      <View style={{ display: 'flex', height: "70%", justifyContent: 'center' }}>
        <Image
          source={require('./../../assets/images/loading.gif')}
          style={{ width: 200, height: 200 }}
          contentFit="contain"
        />
        <Text style={{ paddingTop: 5, textAlign: 'center', fontSize: 20, fontFamily: 'outfit', color: 'grey' }}>
          Do not Go Back
        </Text>
      </View>
    </View>
  );
}

