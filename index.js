import { calculate } from './src/calculate.js';
const stdinIterator = process.stdin.iterator()

try {
    process.stdout.write("Masukkan angka pertama: ");
    const input1 = ((await stdinIterator.next()).value).toString().trim()
    process.stdout.write("Masukkan angka kedua: ");
    const input2 = ((await stdinIterator.next()).value).toString().trim()
    process.stdout.write("Masukkan operator (+, -, *, /): ");
    const operator = ((await stdinIterator.next()).value).toString().trim()
    const a = parseInt(input1);
    const b = parseInt(input2);

    console.log("hasil: " + calculate(a, b, operator))
} catch (error) {
    console.error(error.message)
}