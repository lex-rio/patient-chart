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

    let color = this.getAttribute('color');

    this.addEventListener('click', this.handleClick);

    this.innerHTML = `
      <style>
          div {
              border-radius: 30px;
              border: none;
              background-color: ${color};
              font-size: 56px;
              text-align: center;
          }
      </style>
      <div>ADD</div>
    `;
  }

  handleClick(e) {
    console.log(e);
  }
});