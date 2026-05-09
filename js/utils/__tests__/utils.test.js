import { expect, test, describe, beforeEach, mock } from "bun:test";
import { rafThrottle } from "../utils.js";

describe("rafThrottle", () => {
    let rafCallbacks;

    beforeEach(() => {
        rafCallbacks = [];
        // Mock requestAnimationFrame
        global.requestAnimationFrame = (callback) => {
            rafCallbacks.push(callback);
            return rafCallbacks.length;
        };
    });

    const flushRAF = () => {
        const callbacks = rafCallbacks;
        rafCallbacks = [];
        callbacks.forEach(cb => cb());
    };

    test("should throttle function calls to requestAnimationFrame", () => {
        const fn = mock(() => {});
        const throttled = rafThrottle(fn);

        throttled();
        throttled();
        throttled();

        // Should have only one RAF scheduled
        expect(rafCallbacks.length).toBe(1);
        // Function shouldn't be called until RAF fires
        expect(fn).toHaveBeenCalledTimes(0);

        flushRAF();

        // Function should be called once
        expect(fn).toHaveBeenCalledTimes(1);
        // ticking should be reset, so no more RAFs pending
        expect(rafCallbacks.length).toBe(0);
    });

    test("should use arguments from the first call", () => {
        const fn = mock(() => {});
        const throttled = rafThrottle(fn);

        throttled("first");
        throttled("second");

        flushRAF();

        expect(fn).toHaveBeenCalledWith("first");
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test("should allow subsequent calls after RAF has fired", () => {
        const fn = mock(() => {});
        const throttled = rafThrottle(fn);

        throttled("one");
        flushRAF();
        expect(fn).toHaveBeenCalledWith("one");
        expect(fn).toHaveBeenCalledTimes(1);

        throttled("two");
        flushRAF();
        expect(fn).toHaveBeenCalledWith("two");
        expect(fn).toHaveBeenCalledTimes(2);
    });
});
