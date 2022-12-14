import React from 'react';
import { View,Button,Text,ImageBackground } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { setBackground } from '../redux/reducer/backgroundReducer';
import background1 from '../assets/img/background1.jpg'
import background2 from '../assets/img/background2.jpg'
import background3 from '../assets/img/background3.jpg'
import background4 from '../assets/img/background4.jpg'
import background5 from '../assets/img/background5.jpg'

export default function Tutorial({navigation}) {
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
        case "4":
          dispatch(setBackground("4"));
          break;
        case "5":
          dispatch(setBackground("5"));
          break;
      }
    }
    const textTutorial = "Tic-tac-toe is a fun game that you can play any time and anywhere as long as you have a piece of paper, a pencil, and an opponent. Tic-tac-toe is a zero-sum game, which means that if both players are playing their best, then neither player will win. However, if you learn how to play tic-tac-toe and master some simple strategies, then you'll be able to not only play but win the majority of the time. If you want to know how to play tic-tac-toe, then see Step 1 to get started."
    React.useEffect(()=>{
        navigation.setOptions({
          headerLeft: () => (
            <Button
              onPress={() => {
                navigation.goBack();
              }}
              title="Back"
            />
          ),
          headerRight:null
        });
    },[])
    
    return(
      <ImageBackground 
      source={backgroundCurrent == "1" ? background1 : backgroundCurrent == "2" ? background2: backgroundCurrent == "3" ? background3 : backgroundCurrent == "4" ? background4 : background5}
          resizeMode="cover" 
          style={{flex:1}}
        >
        <View
            style={{
              flex:1,
              backgroundColor: 'rgba(0,0,0, .7)',
              alignItems:'center',
              paddingHorizontal: 20
            }}
          >
            <Text 
              style={{
                paddingHorizontal:10,
                paddingTop:10,
                fontSize:18,
                color:'white'
              }}
            >
              {textTutorial}
            </Text>
        </View>
        </ImageBackground>
    )
}