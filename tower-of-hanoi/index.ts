function towerOfHanoi(
	n: number,
	fromRod: string,
	toRod: string,
	auxRod: string,
): void {
	if (n === 1) {
		return console.log(`Move Disk 1 from rod ${fromRod} to rod ${toRod}`);
	}

	towerOfHanoi(n - 1, fromRod, auxRod, toRod);
	console.log(`Move disk ${n} from rod ${fromRod} to rod ${toRod}`);
	towerOfHanoi(n - 1, auxRod, toRod, fromRod);
}

towerOfHanoi(5, 'A', 'C', 'B');
