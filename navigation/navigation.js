import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screen/HomeScreen';
import TodoListsScreen from '../screen/TodoListsScreen';
import TodoItemsScreen from '../screen/TodoItemsScreen';
import { SignInScreen, SignUpScreen } from '../screen/sign';
import SignOutScreen from '../screen/SignOutScreen';
import { TokenContext } from '../context/context';
import DeleteScreen from '../screen/DeleteScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TodoListsStack() {
 return (
 <Stack.Navigator>
 <Stack.Screen 
 name="TodoLists" 
 component={TodoListsScreen}
 options={{ title: 'Mes Listes' }}
 />
 <Stack.Screen 
 name="TodoItems" 
 component={TodoItemsScreen}
 options={{ title: 'Tâches' }}
 />
 </Stack.Navigator>
 );
}

function MainTabs() {
 return (
 <Tab.Navigator>
 <Tab.Screen name="Home" component={HomeScreen} />
 <Tab.Screen 
 name="TodoLists" 
 component={TodoListsStack} 
 options={{ headerShown: false }}
 />
 <Tab.Screen name="SignOut" component={SignOutScreen} />
 <Tab.Screen name="Delete" component={DeleteScreen} />
 </Tab.Navigator>
 );
}

function AuthTabs() {
 return (
 <Tab.Navigator>
 <Tab.Screen name="SignIn" component={SignInScreen} />
 <Tab.Screen name="SignUp" component={SignUpScreen} />
 </Tab.Navigator>
 );
}

export default function Navigation() {
 const [token] = useContext(TokenContext);
 
 if (token) {
 return (
 <NavigationContainer>
 <MainTabs />
 </NavigationContainer>
 );
 } else {
 return (
 <NavigationContainer>
 <AuthTabs />
 </NavigationContainer>
 );
 }
}