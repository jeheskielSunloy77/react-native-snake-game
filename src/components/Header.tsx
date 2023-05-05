import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../styles/colors'

interface HeaderProps {
	reloadGame: () => void
	pauseGame: () => void
	isPaused: boolean
	score: number
}

export default function Header({
	reloadGame,
	pauseGame,
	score,
	isPaused,
}: HeaderProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{score}
				<MaterialCommunityIcons name='food-apple' size={20} />
			</Text>
			<TouchableOpacity onPress={reloadGame}>
				<MaterialCommunityIcons name='restart' size={35} color={Colors.primary} />
			</TouchableOpacity>
			<TouchableOpacity onPress={pauseGame}>
				<MaterialCommunityIcons name='cog' size={35} color={Colors.primary} />
			</TouchableOpacity>
		</View>
	)
}
const styles = StyleSheet.create({
	text: {
		fontSize: 35,
		fontWeight: 'bold',
		color: Colors.primary,
	},
	container: {
		flex: 0.05,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		minHeight: 50,
		borderBottomColor: '#d1d5db',
		borderBottomWidth: 1,
	},
})
