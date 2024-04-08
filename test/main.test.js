import { main } from '../src/main.js';
import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import { calculate } from '../src/calculate.js';

vi.mock('../src/calculate.js', () => ({
    calculate: vi.fn(),
}));

function initiateStdin(inputs) {
    vi.spyOn(process.stdin, 'iterator').mockImplementation(() => {
        const next = vi.fn();
        inputs.forEach((input) => {
            next.mockReturnValueOnce({ value: input });
        });
        return { next };
    });
}

describe('main', () => {
    let mockStdout = null;
    beforeEach(() => {
        mockStdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    })

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should correctly process input and output', async () => {
        const inputs = ['5', '4', '+'];
        const output = '9';

        initiateStdin(inputs);
        calculate.mockReturnValueOnce(output);

        await main();

        expect(mockStdout).toHaveBeenCalledWith('Masukkan angka pertama: ');
        expect(mockStdout).toHaveBeenCalledWith('Masukkan angka kedua: ');
        expect(mockStdout).toHaveBeenCalledWith('Masukkan operator (+, -, *, /): ');
        expect(calculate).toHaveBeenCalledWith(...inputs);
        expect(mockStdout).toHaveBeenCalledWith('hasil: ' + output + '\n');
    });

    it('should handle error correctly', async () => {
        const inputs = ['5', '0', '/'];
        const output = 'Tidak bisa membagi dengan 0!';

        initiateStdin(inputs);
        calculate.mockImplementation(() => {
            throw new Error(output);
        });

        await main();

        expect(mockStdout).toHaveBeenCalledWith('Masukkan angka pertama: ');
        expect(mockStdout).toHaveBeenCalledWith('Masukkan angka kedua: ');
        expect(mockStdout).toHaveBeenCalledWith('Masukkan operator (+, -, *, /): ');
        expect(calculate).toHaveBeenCalledWith(...inputs);
        expect(mockStdout).toHaveBeenCalledWith(output + '\n');
    });
});