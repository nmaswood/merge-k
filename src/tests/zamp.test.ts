import { it, expect, describe, vi } from "vitest";
import { lastLetter, sumElement, longestWord } from "../zamp";

describe("#lastLetter", () => {
  it("throws on empty input", () => {
    expect(() => lastLetter("")).toThrow("empty input");
  });

  it("logs the last letter of a word", () => {
    const spy = vi.spyOn(console, "log");
    expect(spy.mock.calls.length).toBe(0);
    lastLetter("dog");
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toBe("g");
  });
});

describe("#sumElement", () => {
  it("throws on empty input", () => {
    expect(() => sumElement([])).toThrow("empty input");
  });

  it("sums given elements", () => {
    expect(sumElement([1])).toEqual(1);
    expect(sumElement([1, 2])).toEqual(3);
    expect(sumElement([1, 2, -2, -1])).toEqual(0);
  });
});

describe("longestWord", () => {
  it("throws on empty input", () => {
    expect(() => longestWord([])).toThrow("empty input");
  });

  it("returns the longest word present", () => {
    expect(longestWord(["a", "bbb", "cc"])).toEqual("bbb");
    expect(longestWord(["aaaa", "bbb", "cc"])).toEqual("aaaa");
    expect(longestWord(["aaaa", "bbb", "ccccc"])).toEqual("ccccc");
  });

  it("returns the right most if there is a tie", () => {
    expect(longestWord(["aaaa", "bbbb", "cccc"])).toEqual("cccc");
  });
});
