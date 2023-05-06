import React, { createContext, useContext, useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import { checkEatsFood } from '../utils/checkEatsFood'
import { checkGameOver } from '../utils/checkGameOver'
import randomCoordinate from '../utils/randomCoordinate'

interface GameContextProps {
	direction: Direction
	snake: Coordinate[]
	food: Coordinate
	score: number
	isGameOver: boolean
	isPaused: boolean
	handleGesture: (event: GestureEventType) => void
	reloadGame: () => void
	pauseGame: () => void
}
const GameContext = createContext({} as GameContextProps)

const { width, height } = Dimensions.get('window')
const GAME_BOUNDS = {
	xMin: 0,
	xMax: Math.floor(width / 10),
	yMin: 1,
	yMax: Math.floor(height / 11.6),
}

const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 1

const generateCoordinates = () =>
	randomCoordinate(GAME_BOUNDS.xMax - 5, GAME_BOUNDS.yMax - 5)

export function GameProvider({ children }: { children: React.ReactNode }) {
	const FOOD_INITIAL_POSITION = generateCoordinates()
	const SNAKE_INITIAL_POSITION = [generateCoordinates()]
	const [direction, setDirection] = useState<Direction>(Direction.Right)
	const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION)
	const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION)
	const [score, setScore] = useState(0)
	const [isGameOver, setIsGameOver] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

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
			setFood(generateCoordinates())
			setSnake([newHead, ...snake])
			setScore((prev) => prev + SCORE_INCREMENT)
		} else {
			setSnake([newHead, ...snake.slice(0, -1)])
		}
	}

	const handleGesture = (event: GestureEventType) => {
		const { translationX, translationY } = event.nativeEvent
		if (Math.abs(translationX) > Math.abs(translationY)) {
			if (translationX > 0 && direction !== Direction.Left) {
				setDirection(Direction.Right)
			} else if (translationX < 0 && direction !== Direction.Right) {
				setDirection(Direction.Left)
			}
		} else {
			if (translationY > 0 && direction !== Direction.Up) {
				setDirection(Direction.Down)
			} else if (translationY < 0 && direction !== Direction.Down) {
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

	const pauseGame = () => setIsPaused((prev) => !prev)
	return (
		<GameContext.Provider
			value={{
				direction,

				snake,
				food,
				handleGesture,
				score,
				isGameOver,
				isPaused,
				reloadGame,
				pauseGame,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export const useGameContext = () => useContext(GameContext)
