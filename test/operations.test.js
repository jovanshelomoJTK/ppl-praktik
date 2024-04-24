import { add, divide, multiply, subtract } from '../src/operations.js'
import { describe, expect, it } from 'vitest';

describe('Test add function', () => {
    it('Operasi penambahan 2 angka', () => {
        expect(add(1, 2)).toBe(3);
    });
});

describe('Test subtract function', () => {
    it('Operasi pengurangan 2 angka', () => {
        expect(subtract(2, 1)).toBe(1);
    });
});

describe('Test multiply function', () => {
    it('Operasi perkalian 2 angka', () => {
        expect(multiply(2, 3)).toBe(6);
    });
});

describe('Test divide function', () => {
    it('Operasi pembagian 2 angka', () => {
        expect(divide(6, 2)).toBe(3);
    });

    it('Operasi pembagian dengan penyebut nol', () => {
        expect(() => {
            divide(6, 0)
        }).toThrowError('Tidak bisa membagi dengan 0!');
    });
});