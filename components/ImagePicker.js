import React, {useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import OutlinedButton from "../Ui/OutlinedButton";

const ImagePicker = ({pictureHandler}) => {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()

    const verifyPermissions = async () => {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Нет разрешения на использование камеры', 'Нужно его дать, чтобы сохранить снимок в качестве контакта')
            return false
        }
        return true
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }
        const image =  await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        })
        setPickedImage(image.uri)
        await pictureHandler(image.uri)
    }

    let imagePreview = <Text>No image taken yet</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}}/>
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon='camera' onPress={takeImageHandler}>ФОТО</OutlinedButton>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 300,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
})
