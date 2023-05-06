import { Coordinate } from '../types/types'

export default function randomCoordinate(maxX: number, maxY: number) {
	return {
		x: Math.floor(Math.random() * maxX),
		y: Math.floor(Math.random() * maxY),
	} as Coordinate
}
