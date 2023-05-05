import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Game from './src/screens/Game'
import Settings from './src/screens/Settings'
const Drawer = createDrawerNavigator()

const App = (): JSX.Element => (
	<NavigationContainer>
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer.Navigator initialRouteName='Home'>
				<Drawer.Screen name='Home' component={Game} />
				<Drawer.Screen name='Notifications' component={Settings} />
			</Drawer.Navigator>
		</GestureHandlerRootView>
	</NavigationContainer>
)

export default App
