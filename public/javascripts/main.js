window.customElements.define('chart-item', class extends HTMLElement {
  constructor() {
    super();

    const pElem = document.createElement('li');
    pElem.textContent = this.getAttribute('text');

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(pElem);
  }
});

window.customElements.define('chart-list', class extends HTMLElement {
  constructor() {
    super();

    const pElem = document.createElement('ul');
    pElem.textContent = this.getAttribute('text');

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(pElem);
  }
});

window.customElements.define('patient-chart', class extends HTMLElement {
  constructor() {
    super();

    const pElem = document.createElement('p');
    pElem.textContent = this.getAttribute('text');

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(pElem);
  }
});

window.customElements.define('custom-button', class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    let func = this.getAttribute('func') || 'add';
    let color = this.getAttribute('color') || 'tomato';
    let style = document.createElement('style');
    let el = document.createElement('div');
    let functions = {
      'add': '+',
      'edit': '<div>&#9998;</div>'
    };
    el.innerHTML = `<span>${functions[func]}</span>`;
    el.addEventListener('click', _ => document.getElementById(`form-${func}`).showModal());

    style.textContent = `
      span {
          display: block;
          position: fixed;
          ${(func === 'edit') ? 'left' : 'right'}: 20px;
          bottom: 20px;
          background-color: ${color};
          border-radius: 35px;
          text-align: center;
          color: white;
          font-size: 56px;
          text-align: center;
          padding: 0px 8px;
          width: 50px;
          cursor: pointer;
          
      }
      span>div {
          transform: rotateZ(90deg);
          font-size: 49px;
          margin-right: -5px;
      }`;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(el);
  }
});