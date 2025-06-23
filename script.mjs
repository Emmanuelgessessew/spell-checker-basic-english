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
