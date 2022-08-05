import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../screen/Splash'
import Game from '../screen/Game'

const Stack = createStackNavigator()

const StackNavigator = () => {


  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown:false,
      }}
    >
        <Stack.Screen name='splash' component={Splash} 
        options={{
          
        }}
        />
        <Stack.Screen name='game' component={Game} />
    </Stack.Navigator>
  )
}

export default StackNavigator