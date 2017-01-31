'use babel';

import AtomCodeClippingsView from './atom-code-clippings-view';
import { CompositeDisposable } from 'atom';

export default {

  atomCodeClippingsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomCodeClippingsView = new AtomCodeClippingsView(state.atomCodeClippingsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomCodeClippingsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-code-clippings:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomCodeClippingsView.destroy();
  },

  serialize() {
    return {
      atomCodeClippingsViewState: this.atomCodeClippingsView.serialize()
    };
  },

  toggle() {
    console.log('AtomCodeClippings was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
