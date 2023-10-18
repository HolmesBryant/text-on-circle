/**
 *  Renders text on a circle
 *
 *  @author Holmes Bryant <webbmaastaa@gmail.com>
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
  shadow = ShadowRoot;
  #text = 'Need Text';
  #viewBox = '0 0 100 100';
  #fill = 'none';
  #stroke = 'none';
  static observedAttributes = ['viewBox', 'fill', 'stroke', 'text'];

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = `
    <style>
      :host { display: inline-block; }
    </style>
    <svg viewbox="${this.viewBox}" xmlns="http://www.w3.org/2000/svg">
      <g transform-origin="50% 50%" transform="rotate(270)">
        <path id="circle" fill="${this.fill}" stroke="${this.stroke}"
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
    `;
  }

  connectedCallback() {
    if (this.innerHTML.length > 0) {
      this.text = this.innerHTML;
    }
    this.render();
  }

  render() {
    this.shadow.append(this.tmpl);
  }

  attributeChangedCallback(attr, oldval, newval) {
    this[attr] = newval;
  }

  get viewBox() { return this.#viewBox; }

  set viewBox(value) {
    const el = this.tmpl.querySelector('svg');
    if (!el) throw new Error('Unable to find [svg] in component.');
    el.setAttribute('viewBox', value);
    this.#viewBox = value;
  }

  get fill() { return this.#fill; }

  set fill(value) {
    const el = this.shadow.querySelector('svg > g > path');
    if (!el) throw new Error(`Unable to find [path] in ${this.localName}`);
    el.setAttribute('fill', value);
    this.#fill = value;
  }

  get stroke() { return this.#stroke; }

  set stroke(value) {
    const el = this.shadow.querySelector('svg > g > path');
    if (!el) throw new Error(`Unable to find [path] in ${this.localName}`);
    el.setAttribute('stroke', value);
    this.#stroke = value;
  }

  get text() { return this.#text; }

  set text(value) {
    const el = this.shadow.querySelector('svg > g > text > textPath');
    if (!el) throw new Error(`Unable to find [textPath] in ${this.localName}.`);
    el.textContent = value;
    this.#text = value;
  }
}

document.addEventListener('DOMContentLoaded', customElements.define('text-on-circle', TextOnCircle));
