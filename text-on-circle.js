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
  #font = 'inherit';
  #fontweight = 'inherit';
  #fontsize = 'inherit';
  #textcolor = 'inherit';
  #strokewidth = "1";
  static observedAttributes = [
    'viewBox',
    'fill',
    'stroke',
    'strokewidth',
    'text',
    'textcolor',
    'font',
    'fontsize',
    'fontweight'
    ];

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = `
    <style>
      :host {
        display: inline-block;
        width: inherit;
      }

      path {
        fill: ${this.fill};
        stroke: ${this.stroke};
      }

      textPath {
        fill: ${this.textcolor};
        font-family: ${this.font};
        font-weight: ${this.fontweight};
        font-size: ${this.fontsize};
      }
    </style>
    <svg viewbox="${this.viewBox}" xmlns="http://www.w3.org/2000/svg">
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
    `;
  }

  connectedCallback() {
    if (this.innerHTML.length > 0) this.text = this.innerHTML;
    this.fontsize = this.getAttribute('fontsize') || this.fontsize;
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
    this.#fill = value;
    const el = this.shadow.querySelector('svg > g > path');
    el.style.fill = value;
  }

  get stroke() { return this.#stroke; }

  set stroke(value) {
    this.#stroke = value;
    const el = this.shadow.querySelector('svg > g > path');
    el.style.stroke = value;
  }

  get strokewidth() { return this.#strokewidth; }

  set strokewidth(value) {
    if (!value) value = '1';
    this.#strokewidth = value;
    const el = this.shadow.querySelector('path');
    el.style.strokeWidth = value;
  }

  get text() { return this.#text; }

  set text(value) {
    const el = this.shadow.querySelector('svg > g > text > textPath');
    if (!el) throw new Error(`Unable to find [textPath] in ${this.localName}.`);
    el.textContent = value;
    this.#text = value;
  }

  get textcolor() { return this.#textcolor; }

  set textcolor(value) {
    this.#textcolor = value;
    const el = this.shadow.querySelector('textPath');
    el.style.fill = value;
  }

  get font() { return this.#font; }

  set font(value) {
    if (!value) value = 'inherit';
    this.#font = value;
    const el = this.shadow.querySelector('textPath');
    el.style.fontFamily = value;
  }

  get fontsize() { return this.#fontsize; }

  set fontsize(value) {
    if (!value) value = 'inherit';
    this.#fontsize = value;
    const el = this.shadow.querySelector('textPath');
    el.style.fontSize = value;
    console.log(value, el.style.fontSize);
  }

  get fontweight() { return this.#fontweight; }

  set fontweight(value) {
    if (!value) value = 'inherit';
    this.#fontweight = value;
    const el = this.shadow.querySelector('textPath');
    el.style.fontWeight = value;
    console.log(value, el.style.fontWeight);
  }
}

document.addEventListener('DOMContentLoaded', customElements.define('text-on-circle', TextOnCircle));
