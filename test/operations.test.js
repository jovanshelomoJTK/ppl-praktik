import { add, divide, multiply, subtract } from '../src/operations.js'
import { describe, expect, it } from 'vitest';

describe('Test add function', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });

    it('adds 123 + 456 to equal 579', () => {
        expect(add(123, 456)).toBe(579);
    });

    it('adds 0 + 0 to equal 0', () => {
        expect(add(0, 0)).toBe(0);
    });
});

describe('Test subtract function', () => {
    it('subtract 2 - 1 to equal 1', () => {
        expect(subtract(2, 1)).toBe(1);
    });

    it('subtract 456 - 123 to equal 333', () => {
        expect(subtract(456, 123)).toBe(333);
    });

    it('subtract 900 - 1000 to equal -100', () => {
        expect(subtract(900, 1000)).toBe(-100);
    });
});

describe('Test multiply function', () => {
    it('multiply 2 * 3 to equal 6', () => {
        expect(multiply(2, 3)).toBe(6);
    });

    it('multiply 123 * 456 to equal 56088', () => {
        expect(multiply(123, 456)).toBe(56088);
    });

    it('multiply 0 * 0 to equal 0', () => {
        expect(multiply(0, 0)).toBe(0);
    });
})

describe('Test divide function', () => {
    it('divide 6 / 2 to equal 3', () => {
        expect(divide(6, 2)).toBe(3);
    });

    it('divide 0 / 123 to equal 0', () => {
        expect(divide(0, 123)).toBe(0);
    });

    it('divide 123 / 0 to throw an error', () => {
        expect(() => {
            divide(123, 0)
        }).toThrowError('Tidak bisa membagi dengan 0!');
    });
});