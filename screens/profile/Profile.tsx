import React, {useState, useEffect} from 'react'
import {StyleSheet, ScrollView} from "react-native";
import ProfileForm from "./ProfileForm";
import {useSelector} from "react-redux";
import LoadingOverlay from "../../Ui/LoadingOverlay";
import {fetchUserData} from "../../util/http";
import {setUserInfoAction} from "../../store/userInfoReducer";
import {ProfileDetailsItem} from "./ProfileDetailsItem";
import {getUserData, getUserId} from "../../store/selectors";



const Profile = () => {
    const userDataState = useSelector(getUserData)
    const [fetchedUserData, setFetchedUserData] = useState([])
    const [isUser, setIsUser] = useState(false)
    const {userId} = useSelector(getUserId)
    const [isFetching, setIsFetching] = useState(false)
    const filteredUserData: any = fetchedUserData.filter(data => data.idFromUser === userId)



    useEffect(() => {
        let isMounted = true
        const getUserInfo = async () => {
            setIsFetching(true)
            const userInfo = await fetchUserData()
            setIsFetching(false)
            if(isMounted) {
                setFetchedUserData(userInfo)
                setUserInfoAction(userDataState)
                setIsUser(true)
            }
        }
        getUserInfo().catch(error => console.log(error))
        return () => {
           isMounted = false
        };
    }, [userDataState]);

    if(isFetching) {
        return <LoadingOverlay/>
    }
    if(!isUser || filteredUserData.length === 0) {
        return (
            <ProfileForm/>
        )
    }


    return (
        <ScrollView style={styles.container}>
            {filteredUserData.map(user => (
                <ProfileDetailsItem
                    id={user.id}
                    key={user.id}
                    name={user.name}
                    email={user.email}
                    facebook={user.facebook}
                    instagram={user.instagram}
                    telegram={user.telegram}
                    whatsUp={user.whatsUp}
                    phone={user.phone}
                    photo={user.photo}
                    />
            ))}
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
       backgroundColor: 'black'
    }
})
