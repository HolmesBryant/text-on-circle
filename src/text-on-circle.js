/**
 * @class TextOnCircle
 * @extends HTMLElement
 * @version 2.0
 *
 *  A custom element that renders text on a circle and exposes several css custom variables
 *
 * @property {string} text    - The text to display
 * @property {string} viewbox - The viewBox attribute of the circle (SVG) element. It defines the coordinate system and visible area.
 * @property {AbortController} abortController  - An abort controller whose signal is attached to event listeners.
 *
 *  @author Holmes Bryant <https://github.com/HolmesBryant>
 *  @license GPL-3.0
 *
 *  @usage
 *  	<script type="module" src="text-on-circle.js"></script>
 *  	<text-on-circle>Some Text on a Circle</text-on-circle>
 */

export class TextOnCircle extends HTMLElement {
  /**
   * @private
   * @type {string}
   */
  #text = '';

  /**
   * @private
   * @type {String}
   */
  #viewbox = '0 0 100 100';

  /**
   * @private
   * @type {AbortController}
   */
  abortController = new AbortController();

  /**
   * @public
   * @static
   * @type {string[]}
   */
  static observedAttributes = ['viewbox'];

  /**
   * Constructor
   */
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

  /**
   * Called when element is inserted into the DOM
   * Also creates a listener that watches for changes in the default slot
   *
   * test const el = document.querySelector('text-on-circle');
    el.textContent = 'baz';
    return // undefined
   * @test
     self.textContent = 'baz';
     return // undefined
   *
   * @test noreset return self.text // 'baz'
   */
  connectedCallback() {
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener ('slotchange', event => {
      // this.text = this.textContent;
      const nodes = slot.assignedNodes();
      if (nodes[0]) this.text = (nodes[0].textContent);
    }, { signal:this.abortController.signal } );
  }

  disconnectedCallback() {
    this.abortController.abort();
  }

  /**
   * Called when an observed attribite is changed
   * @param  {string} attr   The attribute name
   * @param  {string} oldval The old value
   * @param  {string} newval The new value
   */
  attributeChangedCallback(attr, oldval, newval) {
    this[attr] = newval;
  }

  /**
   * Gets the value of the viewbox property
   * @returns {string} The value of the viewbox property
   *
   * @test self.viewbox // '0 0 100 100'
   */
  get viewbox() { return this.#viewbox; }

  /**
   * Sets the value of the viewbox property
   * @param {string} value  - A string containing four numbers seperated by spaces or commas.
   *
   * @test self.viewbox = '10 -10 150 150'; return self.viewbox; // '10 -10 150 150'
   * @test self.setAttribute('viewbox', '5, 5, 125, 125'); return self.viewbox; // '5, 5, 125, 125'
   */
  set viewbox(value) {
    const el = this.shadowRoot.querySelector('svg');
    el.setAttribute('viewBox', value);
    this.#viewbox = value;
  }

  /**
   * Gets the value of the text property
   * @returns {string} The displayed text
   *
   * @test self.text // ''
   */
  get text() { return this.#text; }

  /**
   * Sets the value of the text property
   * @param  {string} value - The text to display
   *
   * @test self.text = 'foo'; return self.text; // 'foo'
   */
  set text(value) {
    const el = this.shadowRoot.querySelector('svg textPath');
    if (!el) console.error ('Unable to find [textPath]', this);
    el.textContent = value;
    this.#text = value;
  }
}

document.addEventListener('DOMContentLoaded', customElements.define('text-on-circle', TextOnCircle));
