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
	Switch,
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
	const {
		score,
		reloadGame,
		pauseGame,
		setMoveInterval,
		moveInterval,
		bigFoodRarity,
		setBigFoodRarity,
	} = useGameContext()
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
								title='Resume'
								onPress={() => {
									navigation.closeDrawer()
									pauseGame()
								}}
							/>
							<ThemedButton
								title='New Game'
								onPress={() => {
									reloadGame()
									navigation.closeDrawer()
								}}
							/>
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
									<Button
										title='Easy'
										onPress={() => setMoveInterval(70)}
										color={
											moveInterval === 70 ? Colors[theme].secondary : Colors[theme].primary
										}
									/>
								</View>
								<View style={{ flex: 1 }}>
									<Button
										title='Normal'
										onPress={() => setMoveInterval(50)}
										color={
											moveInterval === 50 ? Colors[theme].secondary : Colors[theme].primary
										}
									/>
								</View>
								<View style={{ flex: 1 }}>
									<Button
										title='Hard'
										onPress={() => setMoveInterval(20)}
										color={
											moveInterval === 20 ? Colors[theme].secondary : Colors[theme].primary
										}
									/>
								</View>
							</View>
							<Text style={{ fontWeight: 'bold', fontSize: 11 }}>Others</Text>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Text>Enable Big Food Spawn</Text>
								<Switch
									value={!!bigFoodRarity}
									onValueChange={(v) => setBigFoodRarity(v ? 0.8 : null)}
								/>
							</View>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Text>Enable Dark Mode</Text>
								<Switch value={isDark} onValueChange={toggleTheme} />
							</View>
							<PersonalRecordBoard />
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
										borderBottomColor: isDark ? '#1f2937' : '#e5e7eb',
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

const PersonalRecordBoard = () => {
	const { personalRecord, wipePersonalRecord } = useGameContext()

	return (
		<>
			<Text style={{ fontWeight: 'bold', fontSize: 11 }}>Personal Record</Text>
			{personalRecord.length ? (
				<>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text style={{ fontWeight: 'bold' }}>Score</Text>
						<Text style={{ fontWeight: 'bold' }}>Dificulty</Text>
						<Text style={{ fontWeight: 'bold' }}>Date Played</Text>
					</View>
					{personalRecord.map((record, index) => {
						return (
							<View
								key={index}
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Text>{record.score}</Text>
								<Text style={{ textTransform: 'capitalize' }}>{record.dificulty}</Text>
								<Text>{new Date(record.date).toLocaleDateString()}</Text>
							</View>
						)
					})}
					<ThemedButton title='Wipe Personal Record' onPress={wipePersonalRecord} />
				</>
			) : (
				<Text style={{ textAlign: 'center' }}>No Records Yet</Text>
			)}
		</>
	)
}
