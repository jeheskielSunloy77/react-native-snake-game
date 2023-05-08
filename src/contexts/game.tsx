import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { Dimensions } from 'react-native'
import { checkEatsFood } from '../helpers/checkEatsFood'
import checkGameOver from '../helpers/checkGameOver'
import randomCoordinate from '../helpers/randomCoordinate'
import { Coordinate, Direction, GestureEventType } from '../types/types'

interface GameContextProps {
	direction: Direction
	snake: Coordinate[]
	food: Coordinate
	score: number
	isGameOver: boolean
	isPaused: boolean
	moveInterval: number
	bigFood: Coordinate | null
	personalRecord: PersonalRecord[]
	setMoveInterval: Dispatch<SetStateAction<number>>
	handleGesture: (event: GestureEventType) => void
	reloadGame: () => void
	pauseGame: () => void
	bigFoodRarity: number | null
	setBigFoodRarity: Dispatch<SetStateAction<number | null>>
	wipePersonalRecord: () => void
}
type GameDifficulty = 'easy' | 'normal' | 'hard'
interface PersonalRecord {
	score: number
	dificulty: GameDifficulty
	date: Date
}

const GameContext = createContext({} as GameContextProps)

const { width, height } = Dimensions.get('window')
const GAME_BOUNDS = {
	xMin: 0,
	xMax: Math.floor(width / 10),
	yMin: 1,
	yMax: Math.floor(height / 11.6),
}

const generateCoordinates = () =>
	randomCoordinate(GAME_BOUNDS.xMax - 5, GAME_BOUNDS.yMax - 5)

const storePersonalRecord = async (personalRecord: PersonalRecord[]) => {
	try {
		await AsyncStorage.setItem('@personalRecord', JSON.stringify(personalRecord))
	} catch (e) {
		console.log(e)
	}
}
const getPersonalRecord = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem('@personalRecord')
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch (e) {
		console.log(e)
	}
}

const getGameDifficulty = (moveInterval: number): GameDifficulty => {
	if (moveInterval === 50) return 'normal'
	if (moveInterval === 70) return 'easy'
	return 'hard'
}

export function GameProvider({ children }: { children: React.ReactNode }) {
	const [direction, setDirection] = useState<Direction>(Direction.Right)
	const [moveInterval, setMoveInterval] = useState(50)
	const [snake, setSnake] = useState<Coordinate[]>([generateCoordinates()])
	const [food, setFood] = useState<Coordinate>(generateCoordinates())
	const [bigFood, setBigFood] = useState<Coordinate | null>(null)
	const [score, setScore] = useState(0)
	const [isGameOver, setIsGameOver] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [bigFoodRarity, setBigFoodRarity] = useState<number | null>(0.8)
	const [personalRecord, setPersonalRecord] = useState<PersonalRecord[]>([])
	const wipePersonalRecord = async () => {
		try {
			await AsyncStorage.removeItem('@personalRecord')
			setPersonalRecord([])
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		getPersonalRecord().then((data) => {
			if (data) setPersonalRecord(data)
		})
	}, [])

	useEffect(() => {
		if (!isGameOver) {
			const intervalId = setInterval(() => {
				!isPaused && moveSnake()
			}, moveInterval)
			return () => clearInterval(intervalId)
		}
	}, [snake, isGameOver, isPaused])

	useEffect(() => {
		if (bigFood) {
			const timeoutId = setTimeout(() => {
				setBigFood(null)
			}, 6000)
			return () => clearTimeout(timeoutId)
		}
	}, [bigFood])

	const moveSnake = () => {
		const snakeHead = snake[0]
		const newHead = { ...snakeHead }
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
			if (bigFoodRarity && Math.random() > bigFoodRarity)
				setBigFood(generateCoordinates())
			setScore((prev) => prev + 1)
		} else if (bigFood && checkEatsFood(newHead, bigFood, 4)) {
			setBigFood(null)
			setSnake([...Array(5).fill(newHead), ...snake])
			setScore((prev) => prev + 5)
		} else {
			setSnake([newHead, ...snake.slice(0, -1)])
		}

		if (
			checkGameOver({
				snakeHead: newHead,
				snakeBody: snake.slice(1),
				boundaries: GAME_BOUNDS,
			})
		) {
			setIsGameOver((prev) => !prev)
			setPersonalRecord((prev) => {
				const newPersonalRecord = [
					...prev,
					{
						score,
						dificulty: getGameDifficulty(moveInterval),
						date: new Date(),
					},
				]
				storePersonalRecord(newPersonalRecord)
				return newPersonalRecord
			})

			return
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
		setSnake([generateCoordinates()])
		setFood(generateCoordinates())
		setBigFood(null)
		setIsGameOver(false)
		setScore(0)
		setDirection(Direction.Right)
		setIsPaused(false)
	}

	const pauseGame = () => setIsPaused((prev) => !prev)
	return (
		<GameContext.Provider
			value={{
				wipePersonalRecord,
				direction,
				moveInterval,
				setMoveInterval,
				snake,
				food,
				handleGesture,
				score,
				isGameOver,
				isPaused,
				reloadGame,
				pauseGame,
				bigFood,
				bigFoodRarity,
				setBigFoodRarity,
				personalRecord,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export const useGameContext = () => useContext(GameContext)
