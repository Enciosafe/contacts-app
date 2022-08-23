import {manipulateAsync} from "expo-image-manipulator";


export const resizeImg: (path, setPlace, scale?: number) => void = (path, setPlace, scale = 300) => {
    manipulateAsync(
        path,
        [
            { resize: {
                    width: scale
                }
            },
        ],
        { compress: 0.1, base64: true}
    )
        .then(imageResult => setPlace(imageResult.base64))
        .catch(e => console.log(e))
};
