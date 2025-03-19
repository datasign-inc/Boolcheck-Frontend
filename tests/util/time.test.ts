import { describe, it, expect } from 'vitest';
import {format8601TimestampToCustomFormat, getStartDateTime} from "../../src/util/time";

describe('getStartDateTime', () => {
    it('should return a valid ISO 8601 timestamp', () => {
        const n = 3;
        const result = getStartDateTime(n);
        console.log(result)
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    });

    it('should return the correct date for n days ago', () => {
        const n = 7;
        const now = new Date();
        now.setUTCDate(now.getUTCDate() - n);
        const expected = now.toISOString().slice(0, -5) + "Z";

        const result = getStartDateTime(n);
        expect(result).toBe(expected);
    });

    it('should return the current date when n = 0', () => {
        const now = new Date().toISOString().slice(0, -5) + "Z";
        const result = getStartDateTime(0);
        expect(result).toBe(now);
    });

    it('should handle large values of n', () => {
        const n = 365; // 1年前
        const now = new Date();
        now.setUTCDate(now.getUTCDate() - n);
        const expected = now.toISOString().slice(0, -5) + "Z";

        const result = getStartDateTime(n);
        expect(result).toBe(expected);
    });
});

describe('testTimestampConversion', () => {
    describe('format8601TimestampToCustomFormat', () => {
        it('should return formatted date for valid timestamp', () => {
            const timestamp = '2025-01-16 00:44:25';
            const result = format8601TimestampToCustomFormat(timestamp);
            expect(result).toBe('2025.01.16 00:44');
        });

        it('should return undefined for invalid timestamp format', () => {
            const invalidTimestamp = 'invalid-date';
            const result = format8601TimestampToCustomFormat(invalidTimestamp);
            expect(result).toBeUndefined();
        });

        it('should return undefined for out-of-range date', () => {
            const outOfRangeTimestamp = '9999-99-99 99:99:99';
            const result = format8601TimestampToCustomFormat(outOfRangeTimestamp);
            expect(result).toBeUndefined();
        });

        it('should handle edge case for leap year date', () => {
            const leapYearTimestamp = '2024-02-29 12:00:00';
            const result = format8601TimestampToCustomFormat(leapYearTimestamp);
            expect(result).toBe('2024.02.29 12:00');
        });
    });
});