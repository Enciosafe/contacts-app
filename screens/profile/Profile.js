import React, {useState} from 'react'
import {View, Text, StyleSheet} from "react-native";
import ProfileDetails from "./ProfileDetails";
import ProfileForm from "./ProfileForm";

const Profile = () => {
    const [isUser, setIsUser] = useState(false);


    if(!isUser) {
        return (
            <ProfileForm/>
        )
    }


    return (
        <ProfileDetails/>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
