const SYMBOL_INDICATOR = Symbol.for('persona.indicator');
const SYMBOL_TEXT = Symbol.for('persona.text');

class PersonaApi extends EventEmitter {
  constructor(config) {
    super();

    this.id = '';
    this.config = config;
  }

  setIndicator(iconName) {
    var div = document.createElement('div');
    div.className = 'indicator';

    var icon = document.createElement('i');
    icon.innerHTML = iconName;
    icon.className = 'material-icons';

    div.appendChild(icon);
    this[SYMBOL_INDICATOR] = div;
  }

  setCustomIndicator(domElement) {
    this[SYMBOL_INDICATOR] = domElement;
  }

  getText() {
    return this[SYMBOL_TEXT];
  }

  setText(text) {
    this[SYMBOL_TEXT] = text;
    this.emit('text', text);
  }
}
