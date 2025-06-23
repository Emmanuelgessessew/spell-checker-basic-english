// This is a placeholder file which shows how you can access JSON data defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import getDictionarySize from "./common.mjs";

window.onload = function() {
    document.querySelector("body").innerText = `There are ${getDictionarySize()} words in the Basic English dictionary`;
}

let dictionary = [];
const customDictionary = new Set();


async function loadDictionary() {
  try {
    const response = await fetch('./words.json');
    if (!response.ok) throw new Error('Failed to load dictionary');
    dictionary = await response.json();
    console.log('✅ Dictionary loaded:', dictionary.slice(0, 10)); // preview first 10
  } catch (err) {
    console.error('❌ Error loading dictionary:', err);
  }
}

loadDictionary();

// Utility: Clean and split text into words
function extractWords(text) {
  return text
    .split(/\s+/)                          // Split by whitespace
    .map(word =>
      word
        .toLowerCase()
        .replace(/[,.?!":;)]$/g, '')       // Remove punctuation at end
        .replace(/^[(]/g, '')              // Remove punctuation at start
        .split('-')                        // Handle hyphenated words
    )
    .flat()
    .filter(word => word.length > 0);      // Remove empty strings
}


function isMisspelled(word) {
  if (!word) return false;

  const isCapitalized = /^[A-Z]/.test(word);
  if (isCapitalized) return false;

  return !dictionary.includes(word) && !customDictionary.has(word);
}


function showMisspelledWords(words) {
  console.log("📢 Words received:", words); // <--- add this

  const feedback = document.getElementById('feedback');
  feedback.innerHTML = '';

  if (words.length === 0) {
    console.log("✅ All words are correct");
    return;
  }

  const message = document.createElement('p');
  message.textContent = 'These words are not in the Basic English dictionary:';
  feedback.appendChild(message);

  const list = document.createElement('ul');
  words.forEach(word => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${word}</strong>`;
    list.appendChild(item);
  });

  feedback.appendChild(list);

  // Show add-to-dictionary button
  const addButton = document.getElementById('add-word-button');
  if (!addButton) {
    console.error("❌ Button not found!");
  } else {
    console.log("✅ Button found, showing it for:", words[0]);
    addButton.style.display = 'inline-block';
    addButton.dataset.word = words[0];
  }
}


// Event listener
document.getElementById('check-button').addEventListener('click', () => {
  const inputText = document.getElementById('text-input').value;
  const words = extractWords(inputText);
  const misspelled = words.filter(word => isMisspelled(word));
  showMisspelledWords(misspelled);
});
 

document.getElementById('add-word-button').addEventListener('click', () => {
  const button = document.getElementById('add-word-button');
  const wordToAdd = button.dataset.word;
  if (wordToAdd) {
    customDictionary.add(wordToAdd);
    button.style.display = 'none';
    document.getElementById('check-button').click(); // re-run spell check
  }
});



