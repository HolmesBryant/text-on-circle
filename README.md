# Text on circle component

Renders text on a circle.

Demo: https://holmesbryant.github.io/text-on-circle/

### Attributes

-   size: Not an actual attribute. Use normal css.
    -   example: `text-in-circle { width: 300px; }`
-   **fill** optional (default: none) The color of the inside of the
    circle.
-   **stroke** optional (default: none) The color of the line around the
    circle.
-   **textcolor** optional (default: inherit) The color of the text.
-   **font** optional (default: inherit) The text font.
-   **fontsize** optional (default: inherit) The size of the text.
-   **fontweight** optional (default: inherit) The weight of the text.
-   **text** optional (default: ' ') The text to place on the circle.
    This is used for dynamically changing the text with javascript. For
    normal use, just include the text inside the opening and closing
    tags.

### Usage

` <script type="module" src="text-on-circle.js"></script>`
`<text-on-circle>Some Text on a Circle</text-on-circle> `
