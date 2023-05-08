import { Coordinate, GameBoundries } from '../types/types'

// i have implements the above solution, but after the snake eats the big food it will grow 5 parts but it will also die intsantly. i think because the game thinks snake eats it self.
// the above function is the function that checks if the game is over

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
