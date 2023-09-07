import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Login from './src/components/Login';
import PagHome from './src/Home/PagHome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsHarryPotter from './src/InformaçãoPag/DetailsHarryPotter';
import Pokemon from './src/PagExtra/Pokemon';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PagHome" component={PagHome} />
        <Stack.Screen name="DetailsHarryPotter" component={DetailsHarryPotter} />
        <Stack.Screen name="Pokemon" component={Pokemon} />
      </Stack.Navigator>

      <Drawer.Navigator screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#e3ca0b",
        drawerActiveTintColor: "#000",
        drawerInactiveBackgroundColor: "gray",
        drawerInactiveTintColor: "#fff",
      }}>
        <Drawer.Screen name='PagHome' component={PagHome}/>
        <Drawer.Screen name='Pokemon' component={Pokemon} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
