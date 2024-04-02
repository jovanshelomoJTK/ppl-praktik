import { calculate } from './calculate.js';
const stdinIterator = process.stdin.iterator()

process.stdout.write("Masukkan angka pertama: ");
const input1 = ((await stdinIterator.next()).value).toString().trim()
process.stdout.write("Masukkan angka kedua: ");
const input2 = ((await stdinIterator.next()).value).toString().trim()
process.stdout.write("Masukkan operator (+, -, *, /): ");
const operator = ((await stdinIterator.next()).value).toString().trim()
const a = parseInt(input1);
const b = parseInt(input2);

console.log(calculate(a, b, operator))