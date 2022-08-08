import React from 'react';
import { SafeAreaView,View,Text,Button,Switch,Image,ImageBackground } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { turnOnSound,turnOffSound } from '../redux/reducer/soundReducer';
import { setBackground } from '../redux/reducer/backgroundReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import background1 from '../assets/img/background1.jpg'
import background2 from '../assets/img/background2.jpg'
import background3 from '../assets/img/background3.jpg'

export default function Setting({navigation}) {
    const dispatch = useDispatch();
    const {statusSound} = useSelector((e)=>e.SoundReducer)
    const {backgroundCurrent} = useSelector((e)=>e.BackgroundReducer);

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
    const handleChangeSound = async()=>{
        if(statusSound === "on"){
            dispatch(turnOffSound())
            await AsyncStorage.removeItem('STATUS_SOUND');
        }else{
            dispatch(turnOnSound())
            await AsyncStorage.setItem(
                'STATUS_SOUND',
                'yes'
            ); 
        }
    }
    const ComponentBackground = ({valueBG}) => {
      return(
        <View
          style={{
            flexDirection:'column'
          }}
        >
          <RadioButton labelHorizontal={true} >
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={{value:valueBG,index:valueBG}}
              isSelected={backgroundCurrent==valueBG}
              onPress={setBackgroundCurrent}
              borderWidth={1}
              buttonInnerColor={'#e74c3c'}
              buttonOuterColor={backgroundCurrent==valueBG ? '#2196f3' : 'white'}
              buttonSize={18}
              buttonOuterSize={25}
              buttonStyle={{}}
              buttonWrapStyle={{marginLeft: 10}}
            />
            <RadioButtonLabel
              obj={{label:`Set ${valueBG}`,value:valueBG,index:valueBG}}
              labelHorizontal={true}
              onPress={setBackgroundCurrent}
              labelStyle={{fontSize: 15, color: 'white'}}
              labelWrapStyle={{}}
            />
          </RadioButton>
          <Image
            source={valueBG == 1 ? background1 : valueBG == 2 ? background2:background3}
            style={{
              backgroundColor:valueBG == 1 ? 'red' : valueBG == 2 ? 'tomato':'green',
              width:'100%',
              height:150,
              borderRadius:10,
              borderColor:'white',
              borderWidth:4,
              marginTop:10
            }}
          >

          </Image>
        </View>
      )
    }
    
    const setBackgroundCurrent = async(value)=> {
      await AsyncStorage.setItem("BACKGROUND",value.toString());
      checkCurrentBackground();
      alert(`Set background is set ${value} success !`)
    }
    return(
        // <SafeAreaView style={{flex:1}}>
            <ImageBackground 
              source={backgroundCurrent == "1" ? background1 : backgroundCurrent == "2" ? background2:background3} 
              resizeMode="cover" 
              style={{flex:1}}
            >
            <View
              style={{flex:1,backgroundColor: 'rgba(0,0,0, 0.4)'}}
            >
            <View
              style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:20,
                paddingHorizontal:20
              }}
            >
            <Text style={{color:'white',marginRight:20,fontSize:17}}>Sound Game</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={statusSound === "on" ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleChangeSound}
                value={statusSound === "on"}
                style={{borderColor:'white',borderWidth:1}}
            />
            </View>
            <View 
              style={{
                justifyContent:'center',
                marginTop:20,
                paddingHorizontal:20
              }}
            >
              <Text style={{color:'white',marginRight:20,fontSize:17}}>Set Background</Text>
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'space-between',
                  marginTop:10
                }}
              >
                <ComponentBackground valueBG={1}/>
                <ComponentBackground valueBG={2}/>
                <ComponentBackground valueBG={3}/>
              </View>
            </View>
          </View>
          </ImageBackground>
        // </SafeAreaView>
    )
}