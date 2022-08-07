import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../screen/Splash'
import Game from '../screen/Game'
import Setting from '../screen/Setting'
import Tutorial from '../screen/Tutorial';
import SoundBackground from './SoundBackground'
import LoadingScreen from '../screen/LoadingScreen'
const Stack = createStackNavigator()

const StackNavigator = () => {
  
    return (
    <>
    <SoundBackground/>
    <Stack.Navigator 
      screenOptions={{
        headerShown:false,
      }}
      initialRouteName={"loading"}
    >
       <Stack.Screen name='loading' component={LoadingScreen} />
        <Stack.Screen name='splash' component={Splash} />
        <Stack.Screen name='game' component={Game} options={{headerShown:true,headerTitle:"TicTacToe"}}/>
        <Stack.Screen name='tutorial' component={Tutorial} options={{headerShown:true,headerTitle:"Tutorial Game"}}/>
        <Stack.Screen name='setting' component={Setting} options={{headerShown:true,headerTitle:"Setting"}}/>
    </Stack.Navigator>
    </>
  )
}

export default StackNavigator