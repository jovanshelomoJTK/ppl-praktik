import { calculate } from './src/calculate.js';

export async function main() {
    const stdinIterator = process.stdin.iterator()

    try {
        process.stdout.write("Masukkan angka pertama: ");
        const input1 = ((await stdinIterator.next()).value).toString().trim()
        process.stdout.write("Masukkan angka kedua: ");
        const input2 = ((await stdinIterator.next()).value).toString().trim()
        process.stdout.write("Masukkan operator (+, -, *, /): ");
        const operator = ((await stdinIterator.next()).value).toString().trim()

        console.log("hasil: " + calculate(input1, input2, operator))
    } catch (error) {
        console.log(error.message)
    }
}
main();