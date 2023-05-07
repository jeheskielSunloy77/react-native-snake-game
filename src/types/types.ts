export interface GestureEventType {
	nativeEvent: { translationX: number; translationY: number }
}

export type Theme = 'light' | 'dark'

export interface Coordinate {
	x: number
	y: number
}

export enum Direction {
	Right,
	Up,
	Left,
	Down,
}

export interface GameBoundries {
	xMin: number
	xMax: number
	yMin: number
	yMax: number
}
