import {TextEditor} from './TextEditor.js';

console.log('main.js');

let doc1 = Automerge.from({ cards: [] })

doc1 = Automerge.change(doc1, 'Add card', doc => {
  doc.cards.push({ title: 'Rewrite everything in Clojure', done: false })
})

const documents = document.querySelector('#documents');

const editors = [];
for (let i = 0; i < 4; i++) {
  editors.push(new TextEditor(documents, onPublish));
}

function onPublish(pubEditor) {
  // Merge this doc with the rest of the docs.
  for (let editor of editors) {
    // Don't try to merge with yourself.
    if (editor === pubEditor) {
      continue;
    }

    editor.merge(pubEditor);
  }
}
