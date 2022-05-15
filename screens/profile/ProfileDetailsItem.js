import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, Share} from 'react-native'
import OutlinedButton from "../../Ui/OutlinedButton";


export const ProfileDetailsItem = ({name, email, facebook, instagram, telegram, whatsUp, phone, photo}) => {

        const sharedStr = `
            NAME: ${name}
            EMAIL: ${email}
            PHONE: ${phone}
            INSTAGRAM: ${instagram}
            TELEGRAMM: ${telegram}
            WHATSUP: ${whatsUp}
            `


        const onShare = async () => {
            try {
                await Share.share({
                    message:
                        sharedStr,
                });
            } catch (error) {
                alert(error.message);
            }
        };



    return (
        <View style={styles.container}>
            <Image style={styles.photo} source={{uri: photo}}/>
            <View>
                <TextInput style={[styles.text, styles.name]} value={name}/>
            </View>
            <View style={styles.row}>
                <Text>EMAIL:</Text>
                <TextInput style={styles.text} value={email.toLowerCase()}/>
            </View>
            <View style={styles.row}>
                <Text>TEL:</Text>
                <TextInput style={styles.text} value={phone}/>
            </View>
            <View style={styles.row}>
                <TextInput style={styles.text} value={instagram}/>
            </View>
            <View style={styles.row}>
                <TextInput style={styles.text} value={facebook}/>
            </View>
            <View style={styles.row}>
                <Text>TELEGRAM:</Text>
                <TextInput style={styles.text} value={telegram}/>
            </View>
            <View style={styles.row}>
                <Text>WHATSUP:</Text>
                <TextInput style={styles.text} value={whatsUp}/>
            </View>
            <View style={{marginTop: 80}}>
                <OutlinedButton onPress={onShare} icon={'send-outline'}>SHARED TO</OutlinedButton>
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
        width: '100%',
        height: 300
    },
    text: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 18,
        marginTop: 10,
        marginLeft: 3
    },
    name: {
        fontFamily: 'Qanelas-Bold',
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    }
})

