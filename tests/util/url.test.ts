import { describe, it, expect } from 'vitest';
import {isUrlEqual} from "../../src/util/url";

describe('isUrlEqual', () => {
    it('should return true for identical URLs', () => {
        expect(isUrlEqual('https://example.com/path', 'https://example.com/path')).toBe(true);
    });

    it('should ignore query parameters and return true for base URLs', () => {
        expect(isUrlEqual('https://example.com/path?query=123', 'https://example.com/path')).toBe(true);
    });

    it('should return true for URLs with trailing slashes treated equally', () => {
        expect(isUrlEqual('https://example.com/path/', 'https://example.com/path')).toBe(true);
    });

    it('should return false for URLs with different paths', () => {
        expect(isUrlEqual('https://example.com/path1', 'https://example.com/path2')).toBe(false);
    });

    it('should return false for URLs with different protocols', () => {
        expect(isUrlEqual('http://example.com/path', 'https://example.com/path')).toBe(false);
    });

    it('should return false for completely different URLs', () => {
        expect(isUrlEqual('https://example.com', 'https://another.com')).toBe(false);
    });

    it('should return false for invalid URLs', () => {
        expect(isUrlEqual('invalid-url', 'https://example.com')).toBe(false);
    });

    it('should throw an error if both URLs are invalid', () => {
        expect(isUrlEqual('invalid-url', 'another-invalid')).toBe(false);
    });

    it('should return true for URLs with different port defaults (http/https)', () => {
        expect(isUrlEqual('http://example.com:80/path', 'http://example.com/path')).toBe(true);
        expect(isUrlEqual('https://example.com:443/path', 'https://example.com/path')).toBe(true);
    });

    it('should return false for URLs with explicitly different ports', () => {
        expect(isUrlEqual('http://example.com:8080/path', 'http://example.com/path')).toBe(false);
    });
});