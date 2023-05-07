import { Coordinate, GameBoundries } from '../types/types'

export default function checkGameOver({
	snakeHead,
	boundaries,
	snakeBody,
}: {
	snakeHead: Coordinate
	boundaries: GameBoundries
	snakeBody: Coordinate[]
}) {
	return (
		snakeHead.x < boundaries.xMin ||
		snakeHead.x > boundaries.xMax ||
		snakeHead.y < boundaries.yMin ||
		snakeHead.y > boundaries.yMax ||
		snakeBody.some((coordinate) => {
			return coordinate.x === snakeHead.x && coordinate.y === snakeHead.y
		})
	)
}
