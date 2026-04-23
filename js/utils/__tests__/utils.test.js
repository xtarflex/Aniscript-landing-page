import { expect, test, describe, mock } from "bun:test";
import { debounce } from "../utils.js";

describe("debounce", () => {

  test("should debounce a function", async () => {
    const callback = mock(() => {});
    const debouncedCallback = debounce(callback, 50);

    debouncedCallback();
    debouncedCallback();
    debouncedCallback();

    expect(callback).toHaveBeenCalledTimes(0);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("should call the function with the last arguments", async () => {
    const callback = mock((arg) => {});
    const debouncedCallback = debounce(callback, 50);

    debouncedCallback("first");
    debouncedCallback("second");
    debouncedCallback("third");

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(callback).toHaveBeenCalledWith("third");
  });
});
