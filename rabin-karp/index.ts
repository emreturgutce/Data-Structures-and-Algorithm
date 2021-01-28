function rabinKarp(pattern: string, text: string): void {
	const q = 101; // Any prime number
	const d = 256; // Num of chars in the input alphabet
	const m = pattern.length;
	const n = text.length;
	let t = 0;
	let p = 0;
	let h = 1;

	for (let i = 0; i < m - 1; i++) {
		h = (h * d) % q;
	}

	for (let i = 0; i < m; i++) {
		p = (d * p + pattern.codePointAt(i)!) % p;
		t = (d * t + pattern.codePointAt(i)!) % p;
	}

	for (let i = 0; i <= n - m; i++) {
		if (p === t) {
			for (var j = 0; j < m; j++) {
				if (text.charAt(i + j) !== pattern.charAt(j)) {
					break;
				}
			}

			if (j === m) {
				console.log(`Pattern found at index ${i}`);
			}
		}

		if (i < n - m) {
			t =
				d * (t - text.codePointAt(i)! * h) +
				(text.codePointAt(i + m)! % q);

			if (t < 0) {
				t = t + q;
			}
		}
	}
}

rabinKarp('abcabbadsddac', 'bad');
