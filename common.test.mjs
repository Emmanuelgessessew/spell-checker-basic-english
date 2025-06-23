import { getDictionarySize } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("Dictionary size is correct", () => {
  assert.equal(getDictionarySize(), 856);
});

import { extractWords } from './common.mjs';

function assertEqualArrays(actual, expected, testName) {
  const passed = actual.length === expected.length &&
    actual.every((word, i) => word === expected[i]);

  if (passed) {
    console.log(`✅ ${testName}`);
  } else {
    console.error(`❌ ${testName}`);
    console.error(`   Expected: ${JSON.stringify(expected)}`);
    console.error(`   Received: ${JSON.stringify(actual)}`);
  }
}

// Test cases
assertEqualArrays(
  extractWords("hello world"),
  ["hello", "world"],
  "Basic sentence"
);

assertEqualArrays(
  extractWords("make a cake, please"),
  ["make", "a", "cake", "please"],
  "Punctuation at end"
);

assertEqualArrays(
  extractWords("red-orange fire"),
  ["red", "orange", "fire"],
  "Hyphenated word"
);

assertEqualArrays(
  extractWords("feisty-cat."),
  ["feisty", "cat"],
  "Hyphen + punctuation"
);

assertEqualArrays(
  extractWords("Ali went to London"),
  ["ali", "went", "to", "london"],
  "Capitalized names"
);

assertEqualArrays(
  extractWords("Hello! How-are you?"),
  ["hello", "how", "are", "you"],
  "Mixed punctuation and hyphen"
);
