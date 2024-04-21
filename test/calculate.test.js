import { calculate } from '../src/calculate.js';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { add, subtract, multiply, divide } from '../src/operations.js';

vi.mock('../src/operations.js', () => ({
    add: vi.fn(),
    subtract: vi.fn(),
    multiply: vi.fn(),
    divide: vi.fn(),
}));

function regexExactString(string) {
    return new RegExp('^' + string
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d') + '$');
}

describe('Test calculate function', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });


    it('calculate 1 + 2 to equal 3', () => {
        add.mockReturnValueOnce(3);

        expect(calculate(1, 2, '+')).toBe(3);
        expect(add).toHaveBeenCalledWith(1, 2);
    });

    it('calculate 2 - 1 to equal 1', () => {
        subtract.mockReturnValueOnce(1);

        expect(calculate(2, 1, '-')).toBe(1);
        expect(subtract).toHaveBeenCalledWith(2, 1);
    });

    it('calculate 2 * 3 to equal 6', () => {
        multiply.mockReturnValueOnce(6);

        expect(calculate(2, 3, '*')).toBe(6);
        expect(multiply).toHaveBeenCalledWith(2, 3);
    });

    it('calculate 6 / 2 to equal 3', () => {
        divide.mockReturnValueOnce(3);

        expect(calculate(6, 2, '/')).toBe(3);
        expect(divide).toHaveBeenCalledWith(6, 2);
    });

    it('calculate 123 "a" "456" should throw an error', () => {
        expect(() => {
            calculate(123, 456, 'a')
        }).toThrowError(regexExactString('Operator Salah! (Harus +, -, *, /)'));
    });

    it('calculate 123 + "a" should throw an error', () => {
        expect(() => {
            calculate(123, 'a', '+')
        }).toThrowError(regexExactString('Variable a atau b bukan angka!'));
    });

    it('calculate 32768 + -1 should throw an error', () => {
        expect(() => {
            calculate(32768, -1, '+')
        }).toThrowError(regexExactString('Variable diluar range!'));
    });
});