import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { turnOnSound } from '../redux/reducer/soundReducer';
var Sound = require('react-native-sound');

export default function SoundBackground(){
    const {statusSound} = useSelector(e=>e.soundReducer)
    const dispatch = useDispatch();

    var whoosh = new Sound(require('../assets/sound_background.mp3'), (error) => {
        if (error) {
        console.log('failed to load the sound', error);
        return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        // Play the sound with an onEnd callback
        if (global.sound) global.sound.stop();
        global.sound = whoosh;
        if(statusSound === "on"){
            whoosh.play((success) => {
                if (success) {
                console.log('successfully finished playing');
                } else {
                console.log('playback failed due to audio decoding errors');
                }
            });
        }else{
            whoosh.stop()
        }
    });

    React.useEffect(()=>{
        checkSound();
    },[])
    const checkSound = async()=>{
        const value = await AsyncStorage.getItem('STATUS_SOUND');
        if(value){
            dispatch(turnOnSound())
        }
    }
    return(
        <></>
    )
}