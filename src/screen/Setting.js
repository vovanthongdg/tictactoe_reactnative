import React from 'react';
import { SafeAreaView,View,Text,Button,Switch } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { turnOnSound,turnOffSound } from '../redux/reducer/soundReducer';
import AsyncStorage from '@react-native-community/async-storage';
export default function Setting({navigation}) {
    const dispatch = useDispatch();
    const {statusSound} = useSelector((e)=>e.soundReducer)

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
    return(
        <SafeAreaView style={{flex:1}}>
            <View
              style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:20,
                paddingHorizontal:20
              }}
            >
            <Text style={{color:'black',marginRight:20,fontSize:17}}>Sound Game</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={statusSound === "on" ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleChangeSound}
                value={statusSound === "on"}
            />
            </View>
        </SafeAreaView>
    )
}