import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Import the react-native-sound module
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { setBackground } from '../redux/reducer/backgroundReducer';

const Splash = ({navigation}) => {
  const {backgroundCurrent} = useSelector((e)=>e.BackgroundReducer);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    checkCurrentBackground();
  },[])
  const checkCurrentBackground = async()=>{
      const currentBackGround = await AsyncStorage.getItem("BACKGROUND");
      switch(currentBackGround){
        case null:
          dispatch(setBackground("1"));
          break;
        case "1":
          dispatch(setBackground("1"));
          break;
        case "2":
          dispatch(setBackground("2"));
          break;
        case "3":
          dispatch(setBackground("3"));
          break;
      }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{`BackgroundCurrent is ${backgroundCurrent}`}</Text>
      <Text style={styles.welcome}>{`TicTacToe Funny Game`}</Text>
      <View style={styles.view1}>
      <TouchableOpacity onPress={() => navigation.navigate('game')}>
        <Text style={styles.instructions}>Play Game </Text>
      </TouchableOpacity>
      </View>
      <View style={{...styles.view1,marginTop:20}}>
      <TouchableOpacity onPress={() => navigation.navigate('tutorial')}>
        <Text style={styles.instructions}>Tutorial </Text>
      </TouchableOpacity>
      </View>
      <View style={{...styles.view1,marginTop:20}}>
      <TouchableOpacity onPress={() => navigation.navigate('setting')}>
        <Text style={styles.instructions}>Setting</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
      },
      welcome: {
        fontSize: 30,
        marginBottom: 54,
        textAlign: 'center',
        color: '#C837E5',
        fontWeight: '900',
      },
      view1: {
        height: 50,
        width: 200,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',

      },
      instructions: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10
      },
})