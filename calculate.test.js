import { calculate } from './calculate.js';
import { expect, test } from '@jest/globals';

describe('Test calculate function', () => {
    test('calculate 1 + 2 to equal 3', () => {
        expect(calculate(1, 2, '+')).toBe(3);
    });

    test('calculate 2 - 1 to equal 1', () => {
        expect(calculate(2, 1, '-')).toBe(1);
    });

    test('calculate 2 * 3 to equal 6', () => {
        expect(calculate(2, 3, '*')).toBe(6);
    });

    test('calculate 6 / 2 to equal 3', () => {
        expect(calculate(6, 2, '/')).toBe(3);
    });

    test('calculate 6 / 0 to throw an error', () => {
        expect(() => {
            calculate(6, 0, '/')
        }).toThrowError('Tidak bisa membagi dengan 0');
    });

    test('calculate 123 + "a" to throw an error', () => {
        expect(() => {
            calculate(123, 'a', '+')
        }).toThrowError('Variable a atau b bukan angka!');
    });

    test('calculate 32768 + 1 to throw an error', () => {
        expect(() => {
            calculate(32768, 1, '+')
        }).toThrowError('Variable diluar range!');
    });

    test('calculate 123 "//" 456 to throw an error', () => {
        expect(() => {
            calculate(123, 456, '//')
        }).toThrowError('Operator Salah! (Harus +, -, *, /)');
    });

    test('calculate 123 "a" 456 to throw an error', () => {
        expect(() => {
            calculate(123, 456, 'a')
        }).toThrowError('Operator Salah! (Harus +, -, *, /)');
    });
});