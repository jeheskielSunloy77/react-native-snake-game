import React, { memo } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Coordinate } from '../types/types'

const foods = {
	big: ['🍖', '🥩', '🥓', '🥞', '🍔', '🥐', '🍣'],
	regular: ['🍎', '🍕', '🍗', '🍇', '🍉', '🍓', '🐟', '🍩', '🥫', '🥚', '🥥'],
}

const randomFoodEmoji = (type: keyof typeof foods) => {
	const food = foods[type]
	const randomIndex = Math.floor(Math.random() * food.length)
	return food[randomIndex]
}

export const RegularFood = memo(({ x, y }: Coordinate) => {
	return (
		<Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>
			{randomFoodEmoji('regular')}
		</Text>
	)
})

export const BigFood = memo(({ x, y }: Coordinate) => {
	return (
		<Text
			style={[
				{
					top: y * 10,
					left: x * 10,
					transform: [
						{
							scale: 2,
						},
					],
				},
				styles.food,
			]}
		>
			{randomFoodEmoji('big')}
		</Text>
	)
})

const styles = StyleSheet.create({
	food: {
		width: 20,
		height: 20,
		borderRadius: 7,
		position: 'absolute',
	},
})
