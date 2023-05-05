import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDrawerStatus } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Food from '../components/Food'
import Snake from '../components/Snake'
import { useGameContext } from '../contexts/game'
import { useThemeContext } from '../contexts/theme'
import { Colors } from '../styles/colors'
export default function Game() {
	const { theme } = useThemeContext()
	const { food, handleGesture, snake, pauseGame, isPaused } = useGameContext()
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
			<Modal transparent visible={isPaused && !isDrawerOpen}>
				<Pressable
					onPress={pauseGame}
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0,0,0,0.5)',
					}}
				>
					<MaterialCommunityIcons name='pause' size={60} color={'white'} />
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
