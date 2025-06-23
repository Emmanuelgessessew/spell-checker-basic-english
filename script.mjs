import {
  extractWords,
  isMisspelled,
  getDictionary,
  getDictionarySize
} from './common.mjs';

const customDictionary = new Set();
const dictionary = getDictionary();

window.onload = function () {
  const message = document.createElement('p');
  document.body.prepend(message);
};


function showMisspelledWords(words) {
  const feedback = document.getElementById('feedback');
  feedback.innerHTML = '';

  if (words.length === 0) return;

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

  const addButton = document.getElementById('add-word-button');
  addButton.style.display = 'inline-block';
  addButton.dataset.word = words[0];
}

document.getElementById('text-input').addEventListener('input', () => {
  document.getElementById('feedback').innerHTML = '';
  document.getElementById('add-word-button').style.display = 'none';
});

document.getElementById('check-button').addEventListener('click', () => {
  const inputText = document.getElementById('text-input').value;
  const words = extractWords(inputText);
  const misspelled = words.filter(word => isMisspelled(word, customDictionary));
  showMisspelledWords(misspelled);
});

document.getElementById('add-word-button').addEventListener('click', () => {
  const button = document.getElementById('add-word-button');
  const wordToAdd = button.dataset.word;
  if (wordToAdd) {
    customDictionary.add(wordToAdd);
    button.style.display = 'none';
    document.getElementById('check-button').click();
  }
});
