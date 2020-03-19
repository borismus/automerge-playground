export class TextEditor {

  doc = Automerge.from({text: new Automerge.Text()});

  constructor(parentEl, publishCallback) {
    // Create a new textarea element, a save button.
    const textarea = document.createElement('textarea');
    textarea.addEventListener('input', this.onTextareaInput);

    // Create a publish button that sends changes manually to other clients.
    const publish = document.createElement('button');
    publish.innerHTML = 'Publish';
    publish.addEventListener('click', this.onPublish);

    parentEl.appendChild(textarea);
    parentEl.appendChild(publish);

    this.publishCallback = publishCallback;
    this.textarea = textarea;
  }

  onTextareaInput = (event) => {
    console.log(`onTextareaInput`, event);
    const newText = this.textarea.value;
    const index = this.textarea.selectionStart;
    const index2 = event.getTargetRanges();
    console.log('index2', index2);
    if (event.inputType === 'insertText') {
      this.doc = Automerge.change(this.doc, 'insertText', d => {
        d.text.insertAt(index - 1, event.data);
      });
    } else if (event.inputType === 'deleteContentBackward') {
      this.doc = Automerge.change(this.doc, 'deleteContentBackward', d => {
        d.text.deleteAt(index);
      });
    } else if (event.inputType === 'deleteContentForward') {
      this.doc = Automerge.change(this.doc, 'deleteContentForward', d => {
        d.text.deleteAt(index);
      });
    }
  }

  onPublish = (event) => {
    // Broadcast a publish event.
    this.publishCallback(this);
    console.log('history', Automerge.getHistory(this.doc).map(state => state.change.message));
  };

  merge = (editor) => {
    this.doc = Automerge.merge(this.doc, editor.doc);
    this.textarea.value = this.doc.text;
  }

}
