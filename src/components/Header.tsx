import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useGameContext } from '../contexts/game'
import { MaterialCommunityIcons, Text } from './themedComponents'
export default function Header() {
	const { score, reloadGame, pauseGame } = useGameContext()
	return (
		<View style={styles.container}>
			<Text>
				{score}
				<MaterialCommunityIcons name='food-apple' size={20} />
			</Text>
			<TouchableOpacity onPress={reloadGame}>
				<MaterialCommunityIcons name='restart' size={35} />
			</TouchableOpacity>
			<TouchableOpacity onPress={pauseGame}>
				<MaterialCommunityIcons name='cog' size={35} />
			</TouchableOpacity>
		</View>
	)
}
const styles = StyleSheet.create({
	text: {
		fontSize: 35,
		fontWeight: 'bold',
	},
	container: {
		flex: 0.05,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		minHeight: 100,
		borderBottomColor: '#d1d5db',
		borderBottomWidth: 1,
	},
})
