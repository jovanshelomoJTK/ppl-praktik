import { main } from '../index.js';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/calculate.js', () => ({
    calculate: jest.fn(),
}));
const { calculate } = await import("../src/calculate.js");

describe('main', () => {
    let stdin;
    let stdout;

    beforeEach(() => {
        stdin = {
            iterator: jest.fn(),
        };
        stdout = {
            write: jest.fn(),
        };
    });

    test('should correctly process input and output', async () => {
        const inputs = ['5', '3', '+'];
        const output = '8';
        process.stdin.mockImplementation(() => {
            return {
                next: jest.fn().mockImplementation(() => Promise.resolve({ value: inputs.shift() })),
            };
        });
        calculate.mockImplementation(() => output);

        await main();

        expect(stdout.write).toHaveBeenCalledWith('Masukkan angka pertama: ');
        expect(stdout.write).toHaveBeenCalledWith('Masukkan angka kedua: ');
        expect(stdout.write).toHaveBeenCalledWith('Masukkan operator (+, -, *, /): ');
        expect(console.log).toHaveBeenCalledWith('hasil: ' + output);
    });
});