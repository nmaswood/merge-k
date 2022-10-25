import { expect, test } from "vitest";
import { mergeK, LogSource, LogEntry } from "../merge-k";

test("works on the empty set", async () => {
  async function* gen(): AsyncGenerator<LogEntry> {}
  const source = [gen()];
  const result = await collect(mergeK(source));
  expect(result).toEqual([]);
});

test.only("works on multiple log entries at once", async () => {
  async function* gen1(): AsyncGenerator<LogEntry> {
    yield { ordinal: 0, message: "a" };
    yield { ordinal: 3, message: "b" };
    yield { ordinal: 6, message: "b" };
  }

  async function* gen2(): AsyncGenerator<LogEntry> {
    yield { ordinal: 1, message: "a" };
    yield { ordinal: 4, message: "b" };
    yield { ordinal: 7, message: "b" };
  }

  async function* gen3(): AsyncGenerator<LogEntry> {
    yield { ordinal: 2, message: "a" };
    yield { ordinal: 5, message: "b" };
    yield { ordinal: 8, message: "b" };
  }

  const source = [gen1(), gen2(), gen3()];
  const result = await collect(mergeK(source));

  expect(result).toEqual([
    { ordinal: 0, message: "a" },
    { ordinal: 1, message: "a" },
    { ordinal: 2, message: "a" },
    { ordinal: 3, message: "b" },
    { ordinal: 4, message: "b" },
    { ordinal: 5, message: "b" },
    { ordinal: 6, message: "b" },
    { ordinal: 7, message: "b" },
    { ordinal: 8, message: "b" },
  ]);
});

async function collect(source: LogSource): Promise<LogEntry[]> {
  const result: LogEntry[] = [];
  for await (const entry of source) {
    result.push(entry);
  }
  return result;
}
