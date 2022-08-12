import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, Share, Alert} from 'react-native'
import OutlinedButton from "../../Ui/OutlinedButton";
import {Colors} from "../../assets/colors/Colors";
import {useNavigation} from "@react-navigation/native";
import {PROFILE} from "../../navigation/navigators";
import type { CompositeNavigationProp } from '@react-navigation/native';
import { IProfileDetailsItemProps } from '../../types/ProfileDetailsProps';



export const ProfileDetailsItem: React.VFC<IProfileDetailsItemProps> = ({
                                                                            id,
                                                                            name,
                                                                            email,
                                                                            facebook,
                                                                            instagram,
                                                                            telegram,
                                                                            whatsUp,
                                                                            phone,
                                                                            photo,
                                                                            address,
}) => {


    const navigation = useNavigation<CompositeNavigationProp<any, any>>()

        const sharedStr = `
        NAME: ${name}
        EMAIL: ${email}
        PHONE: ${phone}
        INSTAGRAM: ${instagram}
        FACEBOOK: ${facebook}
        TELEGRAMM: ${telegram}
        WHATSUP: ${whatsUp}
        ADDRESS: ${address}
        `

        const sharedStrWithoutPhone = `
        NAME: ${name}
        EMAIL: ${email}
        INSTAGRAM: ${instagram}
        TELEGRAMM: ${telegram}
        FACEBOOK: ${facebook}
        WHATSUP: ${whatsUp}
        ADDRESS: ${address}
        `


        const onShare = async () => {
            Alert.alert('Warning', 'Add mobile phone number to share?',[
                {
                    text: "No",
                    onPress: async () => {
                        try {
                            await Share.share({
                                message:
                                sharedStrWithoutPhone,
                            });
                        } catch (error) {
                            alert(error.message);
                        }
                    },
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await Share.share({
                                message:
                                sharedStr,
                            });
                        } catch (error) {
                            alert(error.message);
                        }
                    },
                    style: "default"
                },
            ])
        };

        const onChangeFolderAction = (id) => {
        navigation?.navigate(PROFILE.UPDATE, {
            id: id,
            name: name,
            email: email,
            facebook: facebook,
            instagram: instagram,
            telegram: telegram,
            whatsUp: whatsUp,
            phone: phone,
            photo: photo,
            address: address,
        })
        }

        return (
        <View style={styles.container}>
            <Image style={styles.photo} source={{uri: photo}}/>
            <View>
                <TextInput style={[styles.text, styles.name]} value={name}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>EMAIL:</Text>
                <TextInput style={styles.text} value={email.toLowerCase()}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>TEL:</Text>
                <TextInput style={styles.text} value={phone}/>
            </View>
            <View style={styles.row}>
                <TextInput style={styles.text} value={instagram}/>
            </View>
            <View style={styles.row}>
                <TextInput style={styles.text} value={facebook}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>TELEGRAM:</Text>
                <TextInput style={styles.text} value={telegram}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>WHATSUP:</Text>
                <TextInput style={styles.text} value={whatsUp}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>ADDRESS:</Text>
                <TextInput style={styles.text} value={address}/>
            </View>

            <View style={{flexDirection: 'row', marginTop: 80}}>
                <View>
                    <OutlinedButton onPress={onShare} icon={'send-outline'}>  SHARED TO  </OutlinedButton>
                </View>
                <View>
                    <OutlinedButton onPress={() => onChangeFolderAction(id)} icon={'push-outline'}>    UPDATE     </OutlinedButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center'
    },
    photo: {
        marginTop: 5,
        width: '100%',
        height: 300,
        borderWidth: 1,
        borderRadius: 8
    },
    text: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 18,
        marginTop: 10,
        marginLeft: 3,
        color: Colors.primal
    },
    name: {
        color: Colors.accent,
        textAlign: "center",
        width: 350,
        marginHorizontal: 10,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.primal,
        fontFamily: 'Qanelas-Bold',
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    title: {
        color: 'white'
    }
})

