import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SelectBudgetList } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';
export default function SelectBudget() {
    const navigation = useNavigation();
    const [selectedBudget, setSelectedBudget] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);
    const router=useRouter();
    const handleSelectBudget = (item) => {
        setSelectedBudget(item);
    };
    const onBudgetSelection=()=>{
        if(selectedBudget){
        setTripData({
            ...tripData,
            budget:selectedBudget.title}
        )}
        else{
          ToastAndroid.show('Please select your Budget!',ToastAndroid.LONG);
          return;
        }
     router.push('/create-trip/review-trip')
    }
    useEffect(() => {
        console.log(tripData)
      }, [tripData])
    return (
        <View style={{ paddingTop: 55, padding: 20, backgroundColor: 'white', flex: 1 }}>
            <Text style={{ fontSize: 40, fontFamily: 'outfit-bold' }}>Budget</Text>
            <Text style={{ marginVertical: 10, fontSize: 25, fontFamily: 'outfit-medium', color: 'grey' }}>
                Choose spending for this trip!
            </Text>
            <View >
                <FlatList
                    data={SelectBudgetList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setSelectedBudget(item)} style={{ paddingVertical: 10 }}>
                            <OptionCard
                                option={item}
                                selectedOption={selectedBudget}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity onPress={onBudgetSelection} style={{
                padding: 15,
                backgroundColor: 'black',
                borderRadius: 15,
                marginTop: 55
            }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'outfit' }}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}