function findAllUniquePaths(m: number, n: number, currentPath: string[] = []) {
    if (m === 0 || n === 0) {
        currentPath.pop();
        return;
    }
    if (m === 1 && n === 1) {
        console.log(currentPath);
        currentPath.pop();
        return;
    }

    currentPath.push('Right');
    findAllUniquePaths(m - 1, n, currentPath);

    currentPath.push('Down');
    findAllUniquePaths(m, n - 1, currentPath);

    currentPath.pop();
}

findAllUniquePaths(3, 2);
