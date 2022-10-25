export type LogSource = AsyncGenerator<LogEntry, any, unknown>;

export interface LogEntry {
  ordinal: number;
  message: string;
}

export async function* mergeK(sources: LogSource[]): LogSource {
  if (sources.length === 0) {
    return;
  }

  let [first, ...rest] = sources;
  for (const source of rest) {
    first = merge2(first, source);
  }
  yield* first;
}

async function* merge2(a: LogSource, b: LogSource): LogSource {
  const nextA = async () => {
    const result = await a.next();
    return result.value as LogEntry | undefined;
  };

  const nextB = async () => {
    const result = await b.next();
    return result.value as LogEntry | undefined;
  };

  let aVal = await nextA();
  let bVal = await nextB();

  while (true) {
    if (!aVal && !bVal) {
      break;
    } else if (!aVal && bVal) {
      yield bVal;
      bVal = await nextB();
    } else if (aVal && !bVal) {
      yield aVal;
      aVal = await nextA();
    } else if (aVal && bVal) {
      const aOrd = aVal.ordinal;
      const bOrd = bVal.ordinal;
      if (aOrd <= bOrd) {
        yield aVal;
        aVal = await nextA();
      } else {
        yield bVal;
        bVal = await nextB();
      }
    } else {
      throw new Error("illegal state");
    }
  }
}
