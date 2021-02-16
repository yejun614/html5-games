
class Navigation {
  constructor (game, display) {
    this.game = game;
    this.display = display;
  }

  append (levels, nav, ui) {
    this.levels = levels;

    this.addCustom(ui);
    this.addNavigation(nav, ui);
  }

  addNavigation (selector, customSelector) {
    // Target node
    const target = document.querySelector(selector);
    // Custom node
    const custom = document.querySelector(customSelector);

    // Element counter
    let elementCount = 0;

    // Levels
    for (const name in this.levels) {
      // Get elements
      const { columns, rows, count } = this.levels[name];

      // Callback
      const callback = () => {
        custom.classList.remove('active');

        this.setGame(columns, rows, count);
      }

      // Create element
      const node = this.createElement(name, callback);

      // Add "A" element to document
      target.appendChild(node);

      // Apply first level
      if (elementCount == 0) {
        node.classList.add('active');
        callback();
      }

      // Increase element counter
      elementCount ++;
    }

    // Custom
    const customNode = this.createElement('Customize', () => custom.classList.add('active'));
    document.querySelector(selector).appendChild(customNode);

    // Selector click event
    target.addEventListener('click', event => {
      target.querySelector('.active').classList.remove('active');
      event.target.classList.add('active');
    });
  }

  addCustom (selector) {
    // Create input element
    const IColumn = this.createInputElement('columns', 5, 100);
    const IRow = this.createInputElement('rows', 5, 100);
    const ICount = this.createInputElement('count', 3, 99);

    // Create button element
    const button = this.createButtonElement('Apply', () => {
      const columns = Number(IColumn.value);
      const rows = Number(IRow.value);
      const count = Number(ICount.value);

      this.setGame(columns, rows, count);
    });

    // Add to document
    const elements = [IColumn, IRow, ICount, button];
    for (const el of elements) {
      document.querySelector(selector).appendChild(el);
    }
  }

  setGame (columns, rows, count) {
    this.game.initial(columns, rows, count);
    this.display.initial();
  }

  createElement (label, callback) {
    // Create "A" element
    const node = document.createElement('a');
    node.innerHTML = label;
    node.href = '#';
    node.onclick = callback;

    // Return node
    return node;
  }

  createInputElement (name, min, max) {
    // Create "Input" element (type is number)
    const node = document.createElement('input');

    // Set parameters
    node.name = name;
    node.placeholder = name;
    node.type = 'number';
    node.min = min;
    node.max = max;

    // Return node
    return node;
  }

  createButtonElement (label, callback) {
    // Create "Button" element
    const node = document.createElement('button');
    node.innerHTML = label;
    node.onclick = callback;

    // Return node
    return node;
  }
}

