import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import StartScreen from "./screens/StartScreen";
import Folders from "./screens/Folders";
import IconButton from "./Ui/IconButton";
import ContactsList from "./screens/ContactsList";
import ContactDetails from "./screens/ContactDetails";
import NewContact from "./screens/NewContact";
import NewFolder from "./screens/NewFolder";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()

export const useRoute = (isAuth) => {
    return (
        <>
            {!isAuth
                ? (<AuthStack.Navigator
                    screenOptions={{
                        headerTintColor: 'black',
                        headerShown: false
                    }}
                >
                    <AuthStack.Screen name='Login' component={LoginScreen}/>
                    <AuthStack.Screen name='Register' component={RegisterScreen}/>

                </AuthStack.Navigator>)
                : (<Stack.Navigator
                    screenOptions={{
                        headerTintColor: 'black',
                    }}
                >
                    <Stack.Screen
                        name='Start'
                        component={StartScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name='Profile'
                        component={Profile}
                    />
                    <Stack.Screen
                        name='Folders'
                        component={Folders}
                        options={({navigation}) => ({
                            title: '',
                            headerTitleStyle: {
                                fontFamily: 'Qanelas-Regular'
                            },
                            headerTransparent: true,
                            headerRight: ({tintColor}) => (
                                <IconButton
                                    buttonText='CREATE NEW FOLDER'
                                    icon="add"
                                    size={15}
                                    color={tintColor}
                                    onPress={() => navigation.navigate('NewFolder')}
                                />
                            ),
                            headerBackTitleVisible: false,
                            headerTintColor: 'black'
                        })}
                    />
                    <Stack.Screen
                        name='ContactsList'
                        component={ContactsList}
                        options={({route, navigation}) => ({
                            title: route.params.contactTitle,
                            headerStyle: {
                                fontFamily: 'Qanelas-Bold',
                            },
                            headerRight: ({tintColor}) => (
                                <IconButton
                                    buttonText='ADD NEW CONTACT'
                                    icon="add"
                                    size={15}
                                    color={tintColor}
                                    onPress={() => navigation.navigate('NewContact', {
                                        folderId: route.params.contactId
                                    })}
                                />
                            ),
                            headerTransparent: true,
                            headerBackTitleVisible: false,
                            headerTintColor: 'black'
                        })}

                    />
                    <Stack.Screen
                        name='ContactDetails'
                        component={ContactDetails}
                        options={{
                            title: 'DETAILS',
                            headerTitleStyle: {
                                fontFamily: 'Qanelas-Regular'
                            },
                        }}
                    />
                    <Stack.Screen
                        name='NewContact'
                        component={NewContact}
                        options={{
                            title: 'NEW CONTACT',
                            headerTitleStyle: {
                                fontFamily: 'Qanelas-Regular'
                            },
                            presentation: "modal",
                        }}
                    />
                    <Stack.Screen
                        name='NewFolder'
                        component={NewFolder}
                        options={{
                            title: 'NEW FOLDER',
                            headerTitleStyle: {
                                fontFamily: 'Qanelas-Regular'
                            },
                            presentation: "modal",
                        }}/>
                </Stack.Navigator>)
            }
        </>
    )
}
