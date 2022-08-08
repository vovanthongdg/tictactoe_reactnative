import { StyleSheet, Text, TouchableOpacity, View,ImageBackground,SafeAreaView } from 'react-native'
import React from 'react'
// Import the react-native-sound module
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { setBackground } from '../redux/reducer/backgroundReducer';
import background1 from '../assets/img/background1.jpg'
import background2 from '../assets/img/background2.jpg'
import background3 from '../assets/img/background3.jpg'

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
    <ImageBackground 
        source={backgroundCurrent == "1" ? background1 : backgroundCurrent == "2" ? background2:background3} 
        resizeMode="cover" 
        style={{flex:1}}
      >
      <View
        style={{
          flex:1,
          backgroundColor: 'rgba(0,0,0, .5)',
          justifyContent:'center',
          alignItems:'center',
          paddingHorizontal: 20
        }}
      >
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
    </ImageBackground>
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
        color: 'white',
        fontWeight: '900',
      },
      view1: {
        height: 50,
        width: 200,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      instructions: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
      },
})