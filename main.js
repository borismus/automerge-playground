console.log('main.js');

let doc1 = Automerge.from({ cards: [] })

doc1 = Automerge.change(doc1, 'Add card', doc => {
  doc.cards.push({ title: 'Rewrite everything in Clojure', done: false })
})
