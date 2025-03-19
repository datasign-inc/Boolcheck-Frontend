import { describe, it, expect } from 'vitest';
import {Claimer, UrlContent, VerifiableClaim} from "../src/api/types";
import {workaroundUniqueClaims} from "../src/util/workaround";

// モックデータ生成用のヘルパー関数
const createMockVerifiableClaim = (id: string): VerifiableClaim => {
    const mockUrl: UrlContent = {
        id: `url-${id}`,
        url: `https://example.com/${id}`,
        domain: "example.com",
        title: `Title ${id}`,
        contentType: 'text/html',
        createdAt: new Date().toISOString(),
        trueCount: 0,
        falseCount: 0,
        elseCount: 0,
        verifiedTrueCount: 0,
        verifiedFalseCount: 0,
        verifiedElseCount: 0,
    };

    const mockClaimer: Claimer = {
        id: `claimer-${id}`,
        idToken: `token-${id}`,
        icon: null,
        organization: null,
    };

    return {
        id,
        url: mockUrl,
        claimer: mockClaimer,
        comment: `Comment for ${id}`,
    } as VerifiableClaim;
};

describe('workaroundUniqueClaims', () => {
    it('should return an empty array when input is empty', () => {
        const input: VerifiableClaim[] = [];
        const result = workaroundUniqueClaims(input);
        expect(result).toEqual([]);
    });

    it('should return the same array when all items are unique', () => {
        const input: VerifiableClaim[] = [
            createMockVerifiableClaim('1'),
            createMockVerifiableClaim('2'),
            createMockVerifiableClaim('3'),
        ];
        const result = workaroundUniqueClaims(input);
        expect(result).toEqual(input);
    });

    it('should filter out duplicate items based on their id', () => {
        const uniqueItem = createMockVerifiableClaim('1');
        const duplicateItem = createMockVerifiableClaim('2');

        const input: VerifiableClaim[] = [
            uniqueItem,
            duplicateItem,
            duplicateItem, // 重複
            createMockVerifiableClaim('3'),
        ];

        const result = workaroundUniqueClaims(input);
        expect(result).toEqual([
            uniqueItem,
            duplicateItem,
            createMockVerifiableClaim('3'),
        ]);
    });

    it('should preserve the order of the first occurrences', () => {
        const input: VerifiableClaim[] = [
            createMockVerifiableClaim('2'),
            createMockVerifiableClaim('1'),
            createMockVerifiableClaim('2'), // 重複
            createMockVerifiableClaim('3'),
        ];

        const result = workaroundUniqueClaims(input);
        expect(result).toEqual([
            createMockVerifiableClaim('2'),
            createMockVerifiableClaim('1'),
            createMockVerifiableClaim('3'),
        ]);
    });
});