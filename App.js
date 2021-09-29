/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, StatusBar, Image } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './Common/store/configureStore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSreen from './Login/screens/LoginScreen';
import RegisterScreen from './Login/screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './Home/screens/HomeScreen';
import MapScreen from './Map/screen/MapScreen';
import GasolineListScreen from './GasolineList/screens/GasolineListScreen';

const store = configureStore();

let { width } = Dimensions.get('window');
EStyleSheet.build({
  $rem: width / 55,
});

const Stack = createStackNavigator();
const HomeScreenStack = createStackNavigator();

function WelcomeStackScreens({ setLoggin }) {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{ headerShown: false }} name="Login" component={(props) => <LoginSreen {...props} onLoggin={setLoggin} />} />
      <Stack.Screen name="RegisterScreen" component={(props) => <RegisterScreen {...props} onLoggin={setLoggin} />} />
      <Stack.Screen options={{ headerShown: false }} name="ForgoPassword" component={(props) => <LoginSreen {...props} onLoggin={setLoggin} />} />
    </Stack.Navigator>
  );
}

function HomeStackScreens() {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <HomeScreenStack.Screen options={{ headerShown: false }} name="Map" component={MapScreen} />
      <HomeScreenStack.Screen options={{ headerShown: false }} name="Gasoline" component={GasolineListScreen} />
    </HomeScreenStack.Navigator>
  );
}


export default function App() {
  const [loggedIn, setLoggin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('IsLoggedIn').then(isLoggedIn => {
      if (isLoggedIn === 'true') {
        setLoggin(true);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        {loggedIn ? (
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Homes" component={() => HomeStackScreens(setLoggin)} />
          </Stack.Navigator>)
          :
          (<Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Welcomes" component={() => WelcomeStackScreens(setLoggin)} />
          </Stack.Navigator>)
        }
      </NavigationContainer>
    </Provider>
  );
}
