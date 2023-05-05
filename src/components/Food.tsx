import React, { memo } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Coordinate } from '../types/types'

function getRandomFruitEmoji() {
	const fruitEmojis = ['🍎', '🍊', '🍋', '🍇', '🍉', '🍓', '🍑', '🍍']
	const randomIndex = Math.floor(Math.random() * fruitEmojis.length)
	return fruitEmojis[randomIndex]
}

const Food = memo(({ x, y }: Coordinate) => {
	return (
		<Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>
			{getRandomFruitEmoji()}
		</Text>
	)
})

export default Food

const styles = StyleSheet.create({
	food: {
		width: 20,
		height: 20,
		borderRadius: 7,
		position: 'absolute',
	},
})
