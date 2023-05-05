import { createDrawerNavigator } from '@react-navigation/drawer'
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
	Button,
	MaterialCommunityIcons,
} from './src/components/themedComponents'
import { GameProvider, useGameContext } from './src/contexts/game'
import { ThemeProvider, useThemeContext } from './src/contexts/theme'
import Game from './src/screens/Game'

export const Drawer = createDrawerNavigator()
const App = (): JSX.Element => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<GameProvider>
				<ThemeProvider>
					<AppDrawer />
				</ThemeProvider>
			</GameProvider>
		</GestureHandlerRootView>
	)
}

export default App
const AppDrawer = () => {
	const { score, reloadGame } = useGameContext()
	const { toggleTheme, theme } = useThemeContext()
	return (
		<NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
			<Drawer.Navigator
				initialRouteName='Game'
				drawerContent={({ navigation }) => (
					<View
						style={{ paddingVertical: 38, paddingHorizontal: 10, flex: 1, gap: 10 }}
					>
						<Button
							title='New Game'
							onPress={() => {
								reloadGame()
								navigation.closeDrawer()
							}}
						/>
						<Button
							title='Toggle Theme'
							onPress={() => {
								toggleTheme()
							}}
						/>
					</View>
				)}
			>
				<Drawer.Screen
					name='Game'
					component={Game}
					options={{
						headerTitle: '',
						headerRight: () => (
							<Text
								style={{
									fontSize: 35,
									fontWeight: 'bold',
									marginRight: 10,
								}}
							>
								{score}
								<MaterialCommunityIcons name='food-apple' size={16} />
							</Text>
						),
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	)
}
