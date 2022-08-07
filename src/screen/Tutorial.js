import React from 'react';
import { SafeAreaView,Button,Text } from 'react-native';

export default function Tutorial({navigation}) {
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
        <SafeAreaView>
            <Text 
              style={{
                paddingHorizontal:10,
                paddingTop:10,
                fontSize:18
              }}
            >
              {textTutorial}
            </Text>
        </SafeAreaView>
    )
}