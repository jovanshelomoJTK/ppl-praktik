import { calculate } from './calculate.js';

export async function main() {
    const stdinIterator = process.stdin.iterator()

    process.stdout.write("Masukkan angka pertama: ");
    const input1 = ((await stdinIterator.next()).value).toString().trim()
    process.stdout.write("Masukkan angka kedua: ");
    const input2 = ((await stdinIterator.next()).value).toString().trim()
    process.stdout.write("Masukkan operator (+, -, *, /): ");
    const operator = ((await stdinIterator.next()).value).toString().trim()

    try {
        process.stdout.write("hasil: " + calculate(input1, input2, operator) + "\n")
    } catch (error) {
        process.stdout.write(error.message + "\n")
    }
}