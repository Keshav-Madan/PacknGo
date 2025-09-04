import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:'black'
      }}>
      <Tabs.Screen name="mytrip"
      options={{
        tabBarIcon:({color})=><Entypo name="location-pin" size={27} color={color} />,
        tabBarLabel:'My Trip'
      }}/>
      <Tabs.Screen name="discover" options={{
        tabBarIcon:({color})=><Feather name="map" size={24} color={color} />,
        tabBarLabel:'Discover'
      }}/>
      <Tabs.Screen name="profile" options={{
        tabBarIcon:({color})=><FontAwesome5 name="user-alt" size={24} color={color} />,
        tabBarLabel:'Profile'
      }}/>
    </Tabs>
  );
}
