// Create a function lastLetter that takes a word (string) in parameter and console.logs the last character/letter of that word.
export function lastLetter(word: string) {
  if (word.length === 0) {
    throw new Error("empty input");
  }
  const last = word.at(-1);
  console.log(last);
}

// Create a function sumElement that takes an array of number in parameter and iterates through this array and returns the sum of the elements of this array
export function sumElement(numbers: number[]) {
  if (numbers.length === 0) {
    throw new Error("empty input");
  }
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// Create a function longestWord that returns the longest word of a sentence.

export function longestWord(words: string[]) {
  if (words.length === 0) {
    throw new Error("empty input");
  }

  let longestWordSeen: string | undefined = undefined;

  for (const word of words) {
    if (
      longestWordSeen === undefined ||
      word.length >= longestWordSeen.length
    ) {
      longestWordSeen = word;
    }
  }
  if (longestWordSeen === undefined) {
    throw new Error("illegal state");
  }

  return longestWordSeen;
}
