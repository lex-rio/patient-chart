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

window.customElements.define('add-button', class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    let color = this.getAttribute('color') || '#ffdddd';
    let style = document.createElement('style');
    let el = document.createElement('div');
    el.innerHTML = '<span>+</span>';
    el.addEventListener('click', this.handleClick);

    style.textContent = `
      span {
          display: block;
          border: 2px solid ${color};
          border-radius: 35px;
          color: tomato;
          font-size: 56px;
          text-align: center;
          margin: 0 auto;
          padding: 6px 8px 0px;
          width: 50px;
          cursor: pointer;
      }`;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(el);
  }

  handleClick(e) {
    document.getElementById('form').showModal();
  }
});