/**
 *  A custom element that renders text on a circle
 *  @extends HTMLElement
 *  @version 2.0
 *
 *  @author Holmes Bryant <https://github.com/HolmesBryant>
 *  @license GPL-3.0
 *
 *  @attribute fill [optional]: The color of the inside of the circle. "none" for transparent.
 *  @attribute stroke [optional]: The color of the line around the circle. "none" for transparent.
 *  @attribute text [optional]: The text to place on the circle. This is used primarily for dynamically changing the text with javascript [elem.setAttribute('text', 'Some other text.')]
 *
 *  @usage
 *  	<script type="module" src="text-on-circle.js"></script>
 *  	<text-on-circle>Some Text on a Circle</text-on-circle>
 */

export class TextOnCircle extends HTMLElement {
  #text = '';
  #viewbox = '0 0 100 100';
  static observedAttributes = ['viewbox'];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        --text-color: inherit;
        --text-shadow: none;
        --font: inherit;
        --fontsize: inherit;
        --fontweight: inherit;
        --circle-fill-color: none;
        --circle-stroke-color: none;
        --circle-stroke-width: 1;
        --text-behind: 0;

        display: inline-block;
        width: inherit;
        min-height: 100px;
        overflow: hidden;
      }

      path {
        fill: var(--circle-fill-color);
        stroke: var(--circle-stroke-color);
        stroke-width: var(--circle-stroke-width);
      }

      svg {
        position: relative;

      }

      textPath {
        fill: var(--text-color);
        font-family: var(--font);
        font-size: var(--fontsize);
        font-weight: var(--fontweight);
        text-shadow: var(--text-shadow)
      }

      .hidden {
        display: none;
      }

      #clip-wrapper {
        position: relative;
      }

      #inside {
        clip-path: circle(40%);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: var(--text-behind);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>

    <div id="clip-wrapper">
      <div class="hidden"><slot></slot></div>
      <div id="inside"><slot name="inside"></slot></div>

      <svg viewbox="${this.viewbox}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="blue" />
            <stop offset="100%" stop-color="red" />
          </linearGradient>
        </defs>
        <g transform-origin="50% 50%" transform="rotate(270)">
          <path id="circle"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
          <text>
            <textPath
            href="#circle"
            startOffset="50%"
            text-anchor="middle"
            part="text-on-circle">
              ${this.text}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
    `;
  }

  connectedCallback() {
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener ('slotchange', event => {
      const nodes = slot.assignedNodes();
      if (nodes[0]) this.text = (nodes[0].textContent);
    });
  }

  attributeChangedCallback(attr, oldval, newval) {
    this[attr] = newval;
  }

  get viewbox() { return this.#viewbox; }

  set viewbox(value) {
    const el = this.shadowRoot.querySelector('svg');
    el.setAttribute('viewBox', value);
    this.#viewbox = value;
  }

  get text() { return this.#text; }

  set text(value) {
    const el = this.shadowRoot.querySelector('svg textPath');
    if (!el) throw new Error(`Unable to find [textPath] in ${this.localName}.`);
    el.textContent = value;
    this.#text = value;
  }
}

document.addEventListener('DOMContentLoaded', customElements.define('text-on-circle', TextOnCircle));
