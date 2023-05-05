import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../styles/colors'
import { Coordinate } from '../types/types'

interface SnakeProps {
	snake: Coordinate[]
}

export default function Snake({ snake }: SnakeProps) {
	return (
		<>
			{snake.map((segment, index) => {
				const isHead = index === 0
				return (
					<View
						key={index}
						style={[
							styles.snake,
							{
								left: segment.x * 10,
								top: segment.y * 10,
								backgroundColor: isHead ? Colors.secondary : Colors.primary,
								borderRadius: isHead ? 5 : 2,
							},
						]}
					/>
				)
			})}
		</>
	)
}

const styles = StyleSheet.create({
	snake: {
		width: 15,
		height: 15,
		borderRadius: 2,
		backgroundColor: Colors.primary,
		position: 'absolute',
	},
})
