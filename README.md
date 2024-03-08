# Text on Circle Web Component

Web component that renders text on a circle.

Demo: [https://holmesbryant.github.io/text-on-circle/](https://holmesbryant.github.io/text-on-circle/)

## Changelog

- v2.0
    - Removed 'fill', 'font', 'fontsize', 'fontweight', 'stroke', 'strokewidth' and 'textcolor' from list of observed attributes and made them css custom variables. In order to set these properties now, you must use css.
    - Exposed --text-color, --text-shadow, --font, --fontsize, --fontweight, --circle-fill-color, --circle-stroke-color, and --circle-stroke-width as css variables.
    - Removed 'text' from list of observed attribues and made it the default slot.
    - Added 'viewbox' as an observed attribute.
    - Added new slot named "inside". This allows you to add an image (or other element) inside the circle.

## Usage

    <script type="module" src="text-on-circle.js"></script>
    <text-on-circle>Some Text on a Circle</text-on-circle>

## Attributes

- **viewbox** Defines the position and dimensions ot the circle (svg) viewport.
    - Default: '0 0 100 100'
    - Acceptable values: A list of four numbers: x, y, width and height. The numbers 'x' and 'y' represent the top left coordinates of the component's viewport. The numbers 'width' and 'height' represent its dimensions (in svg "user space" units). These numbers, which are separated by whitespace and/or commas, specify a rectangle which is mapped to the bounds of the component's viewport (**not the browser viewport**). Smaller values for width and height, cause the text to appear larger. The "x" and "y" values cause the rendered area to be offset. Any text that falls outside the viewbox bounds will be clipped.
  
    <pre>
    //example
    <text-on-circle viewbox="5 -60 45 45">
	    ...
    </text-on-circle>

## CSS Custom Variables

- **--text-color:** The color of the text
    - Default: 'inherit'
    - Acceptable Values: any valid css color value
- **--text-shadow** Offsets, spread and color of text shadow
    - Default: 'none'
    - Acceptable values: anything that works with the css text-shadow property
- **--font:** The font family
    - Default: 'inherit'
    - Acceptable values: anything that works with the css font-family property
- **--fontsize:** The size of the text
    - Default: 'inherit'
    - Acceptable values: anything that works with the css font-size property
- **--fontweight:** The weight of the text
    - Default: 'inherit'
    - Acceptable values: anything that works with the css font-weight property
- **--circle-fill-color:** The color of the inside of the circle
    - Default: 'none'
    - Acceptable values: any valid css color value
- **--circle-stroke-color:** The color of the line around the outside of the circle
    - Default: 'none'
    - Acceptable values: any valid css color value
- **--circle-stroke-width:**
    - default: '1'
    - Acceptable values: integer, float, or any valid css length value

## Slots

In addition to the default slot, an addition slot named "inside" is available. This slot allows you to add any valid HTML element, such as an image, inside the circle of text. You may have to add some custom css to make the element display the want you want it to. You don't have to add the css with a "stye" attribute, you can add your style(s) in your stylesheet.

    // example
    <text-on-circle>
        Some Text on a Circle
        <div
            slot="inside"
            style="
                height: 100%;
                width: 100%;
                background-image: radial-gradient(yellow,red);
            "></div>
    </text-on-circle>
...
