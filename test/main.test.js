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

describe('Test main function', () => {
    let mockStdout = null;
    beforeEach(() => {
        mockStdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    })

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Calculate tidak menghasilkan error', async () => {
        const inputs = ['5', '4', '+'];
        const output = 9;

        initiateStdin(inputs);
        calculate.mockReturnValueOnce(output);

        await main();

        expect(mockStdout).toHaveBeenNthCalledWith(1, 'Masukkan angka pertama: ');
        expect(mockStdout).toHaveBeenNthCalledWith(2, 'Masukkan angka kedua: ');
        expect(mockStdout).toHaveBeenNthCalledWith(3, 'Masukkan operator (+, -, *, /): ');
        expect(calculate).toHaveBeenCalledWith(...inputs);
        expect(mockStdout).toHaveBeenNthCalledWith(4, 'hasil: ' + output + '\n');
    });

    it('Calculate menghasilkan error', async () => {
        const inputs = ['5', '0', '/'];
        const output = 'Tidak bisa membagi dengan 0!';

        initiateStdin(inputs);
        calculate.mockImplementation(() => {
            throw new Error(output);
        });

        await main();

        expect(mockStdout).toHaveBeenNthCalledWith(1, 'Masukkan angka pertama: ');
        expect(mockStdout).toHaveBeenNthCalledWith(2, 'Masukkan angka kedua: ');
        expect(mockStdout).toHaveBeenNthCalledWith(3, 'Masukkan operator (+, -, *, /): ');
        expect(calculate).toHaveBeenCalledWith(...inputs);
        expect(mockStdout).toHaveBeenNthCalledWith(4, output + '\n');
    });
});