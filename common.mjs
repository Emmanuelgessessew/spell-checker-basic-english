import words from "./words.json" with { type: "json" };

// Get dictionary size for demo/test use
export const getDictionarySize = () => words.length;

// Return full word list
export const getDictionary = () => words;

// Clean and split text into individual words
export function extractWords(text) {
  return text
    .split(/\s+/)
    .map(word =>
      word
        .toLowerCase()
        .replace(/[,.?!":;)]$/g, '') // Remove punctuation at end
        .replace(/^[(]/g, '')        // Remove punctuation at start
        .split('-')                  // Handle hyphenated words
    )
    .flat()
    .filter(word => word.length > 0);
}

// Check if a word is not in the dictionary (excluding capitalized words)
export function isMisspelled(word, customDictionary) {
  if (!word) return false;
  const isCapitalized = /^[A-Z]/.test(word);
  if (isCapitalized) return false;
  return !words.includes(word) && !customDictionary.has(word);
}
