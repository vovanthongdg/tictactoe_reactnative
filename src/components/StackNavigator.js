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
      initialRouteName="splash"
    >
        <Stack.Screen name='splash' component={Splash} />
        <Stack.Screen name='game' component={Game} options={{headerShown:true,headerTitle:"TicTacToe"}}/>
    </Stack.Navigator>
  )
}

export default StackNavigator