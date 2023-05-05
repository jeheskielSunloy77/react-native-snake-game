import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Food from '../components/Food'
import Header from '../components/Header'
import Snake from '../components/Snake'
import { Colors } from '../styles/colors'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import { checkEatsFood } from '../utils/checkEatsFood'
import { checkGameOver } from '../utils/checkGameOver'
import { randomFoodPosition } from '../utils/randomFoodPosition'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]
const FOOD_INITIAL_POSITION = { x: 5, y: 20 }
const GAME_BOUNDS = { xMin: 0, xMax: 38, yMin: 0, yMax: 63 }
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10

export default function Game(): JSX.Element {
	const [direction, setDirection] = useState<Direction>(Direction.Right)
	const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION)
	const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION)
	const [score, setScore] = useState<number>(0)
	const [isGameOver, setIsGameOver] = useState<boolean>(false)
	const [isPaused, setIsPaused] = useState<boolean>(false)

	useEffect(() => {
		if (!isGameOver) {
			const intervalId = setInterval(() => {
				!isPaused && moveSnake()
			}, MOVE_INTERVAL)
			return () => clearInterval(intervalId)
		}
	}, [snake, isGameOver, isPaused])

	const moveSnake = () => {
		const snakeHead = snake[0]
		const newHead = { ...snakeHead }

		if (checkGameOver(snakeHead, GAME_BOUNDS)) {
			setIsGameOver((prev) => !prev)
			return
		}

		switch (direction) {
			case Direction.Up:
				newHead.y -= 1
				break
			case Direction.Down:
				newHead.y += 1
				break
			case Direction.Left:
				newHead.x -= 1
				break
			case Direction.Right:
				newHead.x += 1
				break
			default:
				break
		}

		if (checkEatsFood(newHead, food, 2)) {
			setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
			setSnake([newHead, ...snake])
			setScore(score + SCORE_INCREMENT)
		} else {
			setSnake([newHead, ...snake.slice(0, -1)])
		}
	}

	const handleGesture = (event: GestureEventType) => {
		const { translationX, translationY } = event.nativeEvent
		if (Math.abs(translationX) > Math.abs(translationY)) {
			if (translationX > 0) {
				setDirection(Direction.Right)
			} else {
				setDirection(Direction.Left)
			}
		} else {
			if (translationY > 0) {
				setDirection(Direction.Down)
			} else {
				setDirection(Direction.Up)
			}
		}
	}

	const reloadGame = () => {
		setSnake(SNAKE_INITIAL_POSITION)
		setFood(FOOD_INITIAL_POSITION)
		setIsGameOver(false)
		setScore(0)
		setDirection(Direction.Right)
		setIsPaused(false)
	}

	const pauseGame = () => {
		setIsPaused(!isPaused)
	}

	return (
		<PanGestureHandler onGestureEvent={handleGesture}>
			<SafeAreaView style={styles.container}>
				<Header
					reloadGame={reloadGame}
					pauseGame={pauseGame}
					isPaused={isPaused}
					score={score}
				/>
				<View style={styles.boundaries}>
					<Snake snake={snake} />
					<Food x={food.x} y={food.y} />
				</View>
			</SafeAreaView>
		</PanGestureHandler>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	boundaries: {
		flex: 1,
	},
})
