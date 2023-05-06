import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDrawerStatus } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Food from '../components/Food'
import Snake from '../components/Snake'
import { Text } from '../components/themedComponents'
import { useGameContext } from '../contexts/game'
import { useThemeContext } from '../contexts/theme'
import { Colors } from '../styles/colors'

export default function Game() {
	const { theme } = useThemeContext()
	const {
		food,
		handleGesture,
		snake,
		pauseGame,
		reloadGame,
		isPaused,
		isGameOver,
	} = useGameContext()
	const isDrawerOpen = useDrawerStatus() === 'open'

	useEffect(() => {
		isDrawerOpen && pauseGame()
	}, [isDrawerOpen])

	return (
		<>
			<PanGestureHandler onGestureEvent={handleGesture}>
				<SafeAreaView
					style={{
						flex: 1,
						backgroundColor: Colors[theme].background,
					}}
				>
					<View style={styles.boundaries}>
						<Snake snake={snake} />
						<Food x={food.x} y={food.y} />
					</View>
				</SafeAreaView>
			</PanGestureHandler>
			<Modal transparent visible={(isPaused && !isDrawerOpen) || isGameOver}>
				<Pressable
					onPress={() => (isGameOver ? reloadGame() : pauseGame())}
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0,0,0,0.5)',
					}}
				>
					{isPaused && !isGameOver ? (
						<MaterialCommunityIcons name='pause' size={60} color={'white'} />
					) : (
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 20,
									fontWeight: 'bold',
								}}
								reverseColor
							>
								Game Over
							</Text>
							<MaterialCommunityIcons name='reload' size={60} color={'white'} />
						</View>
					)}
				</Pressable>
			</Modal>
		</>
	)
}

const styles = StyleSheet.create({
	boundaries: {
		flex: 1,
	},
})
