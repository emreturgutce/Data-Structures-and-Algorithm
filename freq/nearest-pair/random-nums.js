const fs = require('fs');

const file = fs.createWriteStream('output.txt');

for (let i = 1; i < 100000; i++) {
    const val = Math.floor(Math.random() * 1000000);
    file.write(val.toString() + '\n');
}

file.end();
