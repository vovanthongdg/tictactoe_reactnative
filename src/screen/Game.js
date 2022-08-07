import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react'
import 
{ StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Pressable, 
  Image, 
  Dimensions,
  Button,
  Modal
} from 'react-native'

const windowWidth = Dimensions.get('window').width;

const Game = ({navigation}) => {
    const [active_player, setActive_player] = useState('X')
    const [modalHistoryVisible, setmodalHistoryVisible] = useState(false);
    const [history, sethistory] = useState({"winO":0,"winX":0,"draw":0});
    const [markers, setMarkers] = useState([
      null, null, null,
      null, null, null,
      null, null, null
    ])
  
    const markPosition = (position) => {
      if(!markers[position]){
        let temp = [...markers]
        temp[position] = active_player
        setMarkers(temp)
        if(active_player === 'X'){  //transfer chances to next player
          setActive_player('O')
        }else{
          setActive_player('X')
        }
      }
    }
  
    const resetMarkers = () => {
      setMarkers([
        null, null, null,
        null, null, null,
        null, null, null
      ])
    }
    
    const calculateWinner = (squares) => {
      const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
      for(let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
          return squares[a];
        }
      }
      let check = 0;
      for(let j = 0; j < squares.length; j++){
        check++;
        if(squares[j]===null){
          return null
        }
        if(squares[j]!==null && check===9){
          return "not_win"
        }
      }
    }
    const handleUpdateHistory = async()=>{
      const valueHistory = await AsyncStorage.getItem("HISTORY");
      if(valueHistory!==null){
        const tmp = JSON.parse(valueHistory);
        sethistory(tmp)
      }
    }
    const handleSetHistory = async(value)=>{
      let tmp = history;
      switch(value){
        case "O_Win":
          tmp = {...tmp,"winO":tmp.winO+1};
          AsyncStorage.setItem("HISTORY",JSON.stringify(tmp));
          sethistory(tmp)
          break;
        case "X_Win":
          tmp = {...tmp,"winX":tmp.winX+1};
          AsyncStorage.setItem("HISTORY",JSON.stringify(tmp));
          sethistory(tmp)
          break;
        case "Draw":
          tmp = {...tmp,"draw":tmp.draw+1};
          AsyncStorage.setItem("HISTORY",JSON.stringify(tmp));
          sethistory(tmp)
          break;
      }
      
    }
    useEffect(()=>{
      navigation.setOptions({
        headerLeft: () => (
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            title="Back"
          />
        ),
        headerRight:() => (
          <Button
            onPress={() => {
              setmodalHistoryVisible(true)
            }}
            title="History"
          />
        ),
      });
    },[])

    useEffect(()=>{
      handleUpdateHistory();
    },[])

    useEffect(() => {
      const winner = calculateWinner(markers);
      if(winner === 'X'){
        alert("X Won!");
        handleSetHistory("O_Win");
        resetMarkers()
      }else if(winner === 'O'){
        alert("O Won!");
        handleSetHistory("X_Win");
        resetMarkers();
      }else if(winner === "not_win"){
        alert("The match in draw!");
        handleSetHistory("Draw");
        resetMarkers();
      }
    }, [markers])

    const ModalHistory = ()=>(
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalHistoryVisible}
        onRequestClose={() => {
          setmodalHistoryVisible(!modalHistoryVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize:24,fontWeight:'bold'}}>History Game</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
              <Text>O Won :</Text>
              <Text style={{marginLeft:5}}>{history.winO}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:10}}>
              <Text>X Won :</Text>
              <Text style={{marginLeft:5}}>{history.winX}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:10}}>
              <Text>Draw :</Text>
              <Text style={{marginLeft:5}}>{history.draw}</Text>
            </View>
            <View>
              <Button
                title="Close"
                onPress={()=>setmodalHistoryVisible(false)}
                style={{marginTop:15}}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
    return (
      <SafeAreaView style={styles.body}>
        <ModalHistory />
        <View style={[styles.playerInfo, { backgroundColor: active_player === 'X' ? '#FF6666' : '#111111' }]}>
          <Text style={styles.playerTxt}>Player {active_player}'s turn</Text>
        </View>
        <View style={styles.mainContainer}>
  
          {/* Top Left Cell */}
          <Pressable style={styles.cell_top_left} onPress={()=>markPosition(0)}>
            {markers[0] === 'X' && <Image source={require('../../asset/img/x.png')} style={styles.icon} />}
            {markers[0] === 'O' && <Image source={require('../../asset/img/o.png')} style={styles.icon} />}
          </Pressable>
  
          {/* Top Mid Cell */}
          <Pressable style={styles.cell_top_mid} onPress={()=>markPosition(1)}>
            {markers[1] === 'X' && <Image source={require('../../asset/img/x.png')} style={styles.icon} />}
            {markers[1] === 'O' && <Image source={require('../../asset/img/o.png')} style={styles.icon} />}
          </Pressable>
  
          {/* Top Right Cell */}
          <Pressable style={styles.cell_top_right} onPress={()=>markPosition(2)}>
            {markers[2] === 'X' && <Image source={require('../../asset/img/x.png')} style={styles.icon} />}
            {markers[2] === 'O' && <Image source={require('../../asset/img/o.png')} style={styles.icon} />}
          </Pressable>
  
          {/* Mid Left Cell */}
          <Pressable style={styles.cell_mid_left} onPress={()=>markPosition(3)}>
            {markers[3] === 'X' && <Image source={require('../../asset/img/x.png')} style={styles.icon} />}
            {markers[3] === 'O' && <Image source={require('../../asset/img/o.png')} style={styles.icon} />}
          </Pressable>
  
          {/* Mid Mid Cell */}
          <Pressable style={styles.cell_mid_mid} onPress={()=>markPosition(4)}>
            {markers[4] === 'X' && <Image source={require('../../asset/img/x.png')} style={styles.icon} />}
            {markers[4] === 'O' && <Image source={require('../../asset/img/o.png')} style={styles.icon} />}
          </Pressable>
  
          {/* Mid Right Cell */}
          <Pressable style={styles.cell_mid_right} onPress={()=>markPosition(5)}>
            {markers[5] === 'X' && <Image source={require('../../asset/img/x.png')} style={styles.icon} />}
            {markers[5] === 'O' && <Image source={require('../../asset/img/o.png')} style={styles.icon} />}
          </Pressable>
  
          {/* Bottom Left Cell */}
          <Pressable style={styles.cell_bottom_left} onPress={()=>markPosition(6)}>
            {markers[6] === 'X' && <Image source={require('../../asset/img/x.png')} style={styles.icon} />}
            {markers[6] === 'O' && <Image source={require('../../asset/img/o.png')} style={styles.icon} />}
          </Pressable>
  
          {/* Bottom Mid Cell */}
          <Pressable style={styles.cell_bottom_mid} onPress={()=>markPosition(7)}>
            {markers[7] === 'X' && <Image source={require('../../asset/img/x.png')} style={styles.icon} />}
            {markers[7] === 'O' && <Image source={require('../../asset/img/o.png')} style={styles.icon} />}
          </Pressable>
  
          {/* Bottom Right Cell */}
          <Pressable style={styles.cell_bottom_right} onPress={()=>markPosition(8)}>
            {markers[8] === 'X' && <Image source={require('../../asset/img/x.png')} style={styles.icon} />}
            {markers[8] === 'O' && <Image source={require('../../asset/img/o.png')} style={styles.icon} />}
          </Pressable>
        </View>
        <Pressable style={styles.cancleBTN} onPress={resetMarkers}>
          <Image source={require('../../asset/img/replay.png')} style={styles.cancelIcon}/>
        </Pressable>
      </SafeAreaView>
    )
}

export default Game

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff'
      },
      playerInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 20,
        marginTop: 30
      },
      playerTxt: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1.2,
        color: '#fff'
      },
      mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 60
      },
      cell_top_left: {
        width: windowWidth / 3.2,
        height: windowWidth / 3.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 6,
        borderBottomWidth: 6
      },
      cell_top_mid: {
        width: windowWidth / 3.2,
        height: windowWidth / 3.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 6
      },
      cell_top_right: {
        width: windowWidth / 3.2,
        height: windowWidth / 3.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 6,
        borderLeftWidth: 6,
      },
      cell_mid_left: {
        width: windowWidth / 3.2,
        height: windowWidth / 3.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 6,
      },
      cell_mid_mid: {
        width: windowWidth / 3.2,
        height: windowWidth / 3.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cell_mid_right: {
        width: windowWidth / 3.2,
        height: windowWidth / 3.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 6,
      },
      cell_bottom_left: {
        width: windowWidth / 3.2,
        height: windowWidth / 3.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 6,
        borderTopWidth: 6,
      },
      cell_bottom_mid: {
        width: windowWidth / 3.2,
        height: windowWidth / 3.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 6,
      },
      cell_bottom_right: {
        width: windowWidth / 3.2,
        height: windowWidth / 3.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 6,
        borderTopWidth: 6,
      },
      icon: {
        height: 62,
        width: 62
      },
      cancleBTN: {
        position: 'absolute',
        bottom: 20,
        right: 20
      },
      cancelIcon: {
        height: 80,
        width: 80
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
})