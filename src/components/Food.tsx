import React, { memo } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Coordinate } from '../types/types'

function getRandomFruitEmoji() {
	const fruitEmojis = ['🍎', '🍊', '🍋', '🍇', '🍉', '🍓', '🍑', '🍍']
	const randomIndex = Math.floor(Math.random() * fruitEmojis.length)
	return fruitEmojis[randomIndex]
}

export const RegularFood = memo(({ x, y }: Coordinate) => {
	return (
		<Text
			style={[{ top: y * 10, left: x * 10, width: 20, height: 20 }, styles.food]}
		>
			{getRandomFruitEmoji()}
		</Text>
	)
})
export const BigFood = memo(({ x, y }: Coordinate) => {
	return (
		<Text
			style={[{ top: y * 10, left: x * 10, width: 40, height: 40 }, styles.food]}
		>
			{getRandomFruitEmoji()}
		</Text>
	)
})

const styles = StyleSheet.create({
	food: {
		borderRadius: 7,
		position: 'absolute',
	},
})
