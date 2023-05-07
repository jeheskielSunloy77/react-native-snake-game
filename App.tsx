import { createDrawerNavigator } from '@react-navigation/drawer'
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native'
import React from 'react'
import { Button, StatusBar, View } from 'react-native'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
	MaterialCommunityIcons,
	Text,
	Button as ThemedButton,
} from './src/components/themedComponents'
import { GameProvider, useGameContext } from './src/contexts/game'
import { ThemeProvider, useThemeContext } from './src/contexts/theme'
import Game from './src/screens/Game'
import { Colors } from './src/styles/colors'

export const Drawer = createDrawerNavigator()
export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider>
				<GameProvider>
					<AppDrawer />
				</GameProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	)
}

const AppDrawer = () => {
	const { score, reloadGame } = useGameContext()
	const { toggleTheme, theme } = useThemeContext()
	const isDark = theme === 'dark'
	return (
		<>
			<NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
				<Drawer.Navigator
					initialRouteName='Game'
					drawerContent={({ navigation }) => (
						<View
							style={{
								paddingVertical: 20,
								paddingHorizontal: 10,
								flex: 1,
								gap: 10,
								backgroundColor: Colors[theme].background,
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Game Options</Text>
							<Text style={{ fontWeight: 'bold', fontSize: 11 }}>Game</Text>
							<ThemedButton
								title='New Game'
								onPress={() => {
									reloadGame()
									navigation.closeDrawer()
								}}
							/>
							<Text style={{ fontWeight: 'bold', fontSize: 11 }}>App Theme</Text>
							<View
								style={{
									display: 'flex',
									gap: 10,
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<View style={{ flex: 1 }}>
									<Button
										title='Dark Mode'
										onPress={toggleTheme}
										color={isDark ? Colors[theme].secondary : Colors[theme].primary}
									/>
								</View>
								<View style={{ flex: 1 }}>
									<Button
										title='Light Mode'
										onPress={toggleTheme}
										color={isDark ? Colors[theme].primary : Colors[theme].secondary}
									/>
								</View>
							</View>
							<Text style={{ fontWeight: 'bold', fontSize: 11 }}>Game Difficulty</Text>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									gap: 10,
								}}
							>
								<View style={{ flex: 1 }}>
									<Button title='Easy' />
								</View>
								<View style={{ flex: 1 }}>
									<Button title='Normal' />
								</View>
								<View style={{ flex: 1 }}>
									<Button title='Hard' />
								</View>
							</View>
						</View>
					)}
				>
					<Drawer.Screen
						name='Game'
						component={Game}
						options={{
							headerTitle: '',
							header: ({ navigation }) => (
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										paddingHorizontal: 15,
										borderBottomWidth: 1,
										borderBottomColor: '#e5e7eb',
										backgroundColor: Colors[theme].background,
									}}
								>
									<MaterialCommunityIcons
										name='menu'
										onPress={() => navigation.openDrawer()}
										size={35}
									/>
									<Text
										style={{
											fontSize: 35,
											fontWeight: 'bold',
										}}
									>
										{score}
										<MaterialCommunityIcons name='food-apple' size={16} color='primary' />
									</Text>
								</View>
							),
						}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
			<StatusBar
				barStyle={isDark ? 'light-content' : 'dark-content'}
				backgroundColor={Colors[theme].background}
			/>
		</>
	)
}
