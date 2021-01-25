class QueenPosition {
	readonly rowIndex: number;
	readonly columnIndex: number;

	constructor(rowIndex: number, columnIndex: number) {
		this.rowIndex = rowIndex;
		this.columnIndex = columnIndex;
	}

	get leftDiagonal(): number {
		return this.rowIndex - this.columnIndex;
	}

	get rightDiagonal(): number {
		return this.rowIndex + this.columnIndex;
	}
}

function isSafe(
	queensPositions: Array<QueenPosition | null>,
	rowIndex: number,
	columnIndex: number,
): boolean {
	const newQueenPosition = new QueenPosition(rowIndex, columnIndex);

	for (let i = 0; i < queensPositions.length; i++) {
		const currentQueenPosition = queensPositions[i];

		if (
			currentQueenPosition &&
			(newQueenPosition.columnIndex ===
				currentQueenPosition.columnIndex ||
				newQueenPosition.rowIndex === currentQueenPosition.rowIndex ||
				newQueenPosition.leftDiagonal ===
					currentQueenPosition.leftDiagonal ||
				newQueenPosition.rightDiagonal ===
					currentQueenPosition.rightDiagonal)
		) {
			return false;
		}
	}

	return true;
}

function nQueens(
	queensCount: number,
	rowIndex: number = 0,
	solutions = new Array<Array<QueenPosition>>(),
	previousQueensPositions = new Array<QueenPosition | null>(queensCount).fill(
		null,
	),
): Array<Array<QueenPosition>> {
	const queensPositions = [...previousQueensPositions].map(
		(queenPosition) => {
			return !queenPosition
				? queenPosition
				: new QueenPosition(
						queenPosition.rowIndex,
						queenPosition.columnIndex,
				  );
		},
	);

	if (rowIndex === queensCount) {
		solutions.push(queensPositions as Array<QueenPosition>);
		return solutions;
	}

	for (let i = 0; i < queensCount; i++) {
		if (isSafe(queensPositions, rowIndex, i)) {
			queensPositions[rowIndex] = new QueenPosition(rowIndex, i);

			nQueens(queensCount, rowIndex + 1, solutions, queensPositions);

			queensPositions[rowIndex] = null;
		}
	}

	return solutions;
}

console.log(nQueens(4));
