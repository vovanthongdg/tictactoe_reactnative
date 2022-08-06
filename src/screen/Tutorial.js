import React from 'react';
import { SafeAreaView,Button } from 'react-native';

export default function Tutorial({navigation}) {

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
        <SafeAreaView>
            
        </SafeAreaView>
    )
}